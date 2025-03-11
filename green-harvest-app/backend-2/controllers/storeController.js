const db = require("../models");
const Store = db.Store;
const moment = require('moment');

// Get all stores
const getStores = async (req, res) => {
    try {
        const stores = await Store.findAll();
        res.json(stores);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            return res.status(400).json({ message: "Validation Error", errors: messages });
        }
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get store by ID
const getStoreById = async (req, res) => {
    try {
        const store = await Store.findByPk(req.params.id);
        if (!store) return res.status(404).json({ message: "Store not found" });

        res.json(store);
    }
    catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            return res.status(400).json({ message: "Validation Error", errors: messages });
        }
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// #region Create a new store
const createStore = async (req, res) => {
    try {
        const { Name, Description, Location, CreatedBy } = req.body;
        const newStore = await
            Store.create({ Name,
                            Description,
                            Location,
                            CreatedBy
                        });

        res.status(200).json(newStore);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            return res.status(400).json({ message: "Validation Error", errors: messages });
        }
        res.status(500).json({ message: "Error creating store", error: error.message });
    }
};

// #region Update store

const updateStore = async (req, res) => {
    try {
        const { Name, Description, Location, UpdatedBy } = req.body;
        const store = await Store.findByPk(req.params.id);

        if (!store) return res.status(404).json({ message: "Store not found" });

        store.Name = Name || store.Name;
        store.Description = Description || store.Description;
        store.Location = Location || store.Location;
        store.UpdatedBy = UpdatedBy || store.UpdatedBy;// Format the date using Moment.js
        await store.save();

        res.json(store);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            return res.status(400).json({ message: "Validation Error", errors: messages });
        }
        res.status(500).json({ message: "Error updating store", error: error.message });
    }
};

//#endregion

// #region Delete store
const deleteStore = async (req, res) => {
    try {
        const store = await Store.findByPk(req.params.id);
        if (!store) return res.status(404).json({ message: "Store not found" });

        await store.destroy();
        res.json({ message: "Store deleted successfully" });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            return res.status(400).json({ message: "Validation Error", errors: messages });
        }
        res.status(500).json({ message: "Error updating store", error: error.message });
    }
}
//#endregion
module.exports = { getStores, getStoreById, createStore, updateStore, deleteStore };
