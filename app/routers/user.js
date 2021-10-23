const express = require("express");
const UserController = require("../controllers/user");

const api = express.Router();

api.post("/test", UserController.test);

module.exports = api;
