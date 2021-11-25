const express = require("express");
const OrderController = require("../controllers/order");
const { validateJWT } = require("../middleware/validateToken");

const api = express.Router();

api.post("/", validateJWT, OrderController.createOrder);
api.get("/", validateJWT, OrderController.getOrders);

module.exports = api;
