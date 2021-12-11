const express = require("express");
const InventoryController = require("../controllers/inventory");
const { validateJWT } = require("../middleware/validateToken");

const api = express.Router();

api.post("/", validateJWT, InventoryController.createInventory);
api.delete("/", validateJWT, InventoryController.deleteInventory);
api.put("/", validateJWT, InventoryController.updateInventory);
api.get("/", validateJWT, InventoryController.getInventory);
api.get("/with-stock", validateJWT, InventoryController.getInventoryWithStock);

module.exports = api;
