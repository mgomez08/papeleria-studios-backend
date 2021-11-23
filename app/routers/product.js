const express = require("express");
const ProductController = require("../controllers/product");
const { validateJWT } = require("../middleware/validateToken");

const api = express.Router();

api.post("/", validateJWT, ProductController.createProduct);
api.delete("/", validateJWT, ProductController.deleteProduct);
api.put("/", validateJWT, ProductController.updateProduct);
api.get("/", validateJWT, ProductController.getProducts);

module.exports = api;
