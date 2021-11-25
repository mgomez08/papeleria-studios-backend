const express = require("express");
const SaleController = require("../controllers/sale");
const { validateJWT } = require("../middleware/validateToken");

const api = express.Router();

api.get("/", validateJWT, SaleController.getSales);

module.exports = api;
