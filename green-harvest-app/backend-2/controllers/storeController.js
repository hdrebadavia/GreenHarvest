const db = require("../models");
const { get } = require("../routes/productRoutes");
const Store = db.Store;

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

// Create a new store
const createStore = async (req, res) => {
    try {
        const { Name, Description, Location, CreatedBy } = req.body;
        const newStore = await Store.create({ Name, Description,  Location, CreatedBy });
        res.status(201).json(newStore);
    } catch (error) {
        res.status(500).json({ message: "Error creating store", error });
    }
};

const updateStore = async (req, res) => {
    try {
        const { Name, Description, Location, UpdatedBy } = req.body;
        const store = await Store.findByPk(req.params.id);

        if (!store) return res.status(404).json({ message: "Store not found" });

        store.Name = Name || store.Name;
        store.Description = Description || store.Description;
        store.Location = Location || store.Location;
        store.UpdatedBy = UpdatedBy || store.UpdatedBy;
        await store.save();

        res.json(store);
    } catch (error) {
        res.status(500).json({ message: "Error updating store", error });
    }
};


module.exports = { getStores, getStoreById, createStore, updateStore };
