const express = require("express");
const ProviderController = require("../controllers/provider");
const { validateJWT } = require("../middleware/validateToken");

const api = express.Router();

api.post("/", validateJWT, ProviderController.createProvider);

module.exports = api;
