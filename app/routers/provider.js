const express = require("express");
const ProviderController = require("../controllers/provider");
const { validateJWT } = require("../middleware/validateToken");

const api = express.Router();

api.post("/", validateJWT, ProviderController.createProvider);
api.delete("/", validateJWT, ProviderController.deleteProvider);
api.put("/", validateJWT, ProviderController.updateProvider);
api.get("/", validateJWT, ProviderController.getProviders);

module.exports = api;
