const express = require("express");
const { getStores, createStore, getStoreById, updateStore, deleteStore } = require("../controllers/storeController");

const router = express.Router();

router.get("/", getStores);
router.get("/:id", getStoreById);
router.post("/createStore", createStore);
router.patch("/updateStore/:id", updateStore);
router.delete("/deleteStore/:id", deleteStore);

module.exports = router;
