const express = require("express");
const { getStores, createStore, getStoreById, updateStore } = require("../controllers/storeController");

const router = express.Router();

router.get("/", getStores);
router.get("/:id", getStoreById);
router.post("/createStore", createStore);
router.patch("/updateStore/:id", updateStore);
module.exports = router;
