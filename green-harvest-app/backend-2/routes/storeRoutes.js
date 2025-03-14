const express = require("express");
const { getStores, createStore, getStoreById, updateStore, deleteStore } = require("../controllers/storeController");

const router = express.Router();

router.get("/", getStores);
router.get("/:id", getStoreById);
router.post("/", createStore);
router.patch("/:id", updateStore);
router.delete("/:id", deleteStore);

module.exports = router;
