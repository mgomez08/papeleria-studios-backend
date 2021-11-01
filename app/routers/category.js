const express = require("express");
const CategoryController = require("../controllers/category");
const { validateJWT } = require("../middleware/validateToken");

const api = express.Router();

api.post("/", validateJWT, CategoryController.createCategory);
api.delete("/", validateJWT, CategoryController.deleteCategory);
api.put("/", validateJWT, CategoryController.updateCategory);
api.get("/", validateJWT, CategoryController.getCategories);

module.exports = api;
