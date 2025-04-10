const express = require("express");
const { getProducts, createProduct, getProductById, getProductsByStoreId, updateProduct, deleteProduct } = require("../controllers/productController");

const router = express.Router();

router.get("/", getProducts);
router.get("/store/:storeId", getProductsByStoreId);
router.post("/", createProduct);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
