const db = require("../models"); // Import the models index
const Product = db.Product; // Get the Product model


// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include:{
                model: db.User,
                as: "Creator",
                attributes: ['FirstName', 'LastName']
            }
        });
        const productsWithFullName = products.map(product => ({
            ...product.toJSON(),
            CreatedByFullName: `${product.Creator.FirstName} ${product.Creator.LastName}`
        }));
        res.json(productsWithFullName);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            return res.status(400).json({ message: "Validation Error", errors: messages });
        }
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


// Get product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: {
                model: db.User,
                as: "Creator",
                attributes: ["FirstName", "LastName"]
            }
        });
        if (!product) return res.status(404).json({ message: "Product not found" });

        const productWithFullName = {
            ...product.toJSON(),
            CreatedByFullName: `${product.Creator.FirstName} ${product.Creator.LastName}`
        };
        res.json(productWithFullName);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            return res.status(400).json({ message: "Validation Error", errors: messages });
        }
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { Name, Description, ProductType, Quantity, Price, Unit, StoreID, farmerId, UpdatedBy } = req.body;
        const newProduct = await
            Product.create({
                Name,
                Description,
                ProductType,
                Quantity,
                Price,
                Unit,
                StoreID,
                CreatedBy: farmerId,
                UpdatedBy });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const { Name, Description, ProductType, Quantity, Price, Unit, StoreID, UpdatedBy } = req.body;
        const product = await Product.findByPk(req.params.id);

        if (!product) return res.status(404).json({ message: "Product not found" });

        product.Name = Name || product.Name;
        product.Description = Description || product.Description;
        product.ProductType = ProductType || product.ProductType;
        product.Quantity = Quantity || product.Quantity;
        product.Price = Price || product.Price;
        product.Unit = Unit || product.Unit;
        product.UpdatedBy = UpdatedBy || product.UpdatedBy;

        await product.save();

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        await product.destroy();
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
