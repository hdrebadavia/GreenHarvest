const Product = require("../models/productModel");

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll(); // Fetch all products
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id); // Find product by primary key
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  const { name, price, stock, vendorId } = req.body;
  try {
    const newProduct = await Product.create({ name, price, stock, vendorId });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

// Update an existing product
const updateProduct = async (req, res) => {
  const { name, price, stock, vendorId } = req.body;
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.update({ name, price, stock, vendorId });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

module.exports = { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct };
