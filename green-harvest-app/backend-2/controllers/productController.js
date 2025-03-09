const db = require("../models"); // Import the models index
const Product = db.Product; // Get the Product model


// Get all products
const getProducts = async (req, res) => {
    try {
        console.log("Fetching products...");
        const products = await Product.findAll();
        console.log("Generated Query:", products);
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};


// Get product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { Name, Description, ProductType, Quantity, Price, Unit, StoreID, farmerId, UpdatedBy } = req.body;
        const newProduct = await Product.create({ Name, Description, ProductType, Quantity, Price, Unit, StoreID, CreatedBy: farmerId, UpdatedBy });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const { name, price, stock } = req.body;
        const product = await Product.findByPk(req.params.id);

        if (!product) return res.status(404).json({ message: "Product not found" });

        product.name = name || product.name;
        product.price = price || product.price;
        product.stock = stock || product.stock;
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
