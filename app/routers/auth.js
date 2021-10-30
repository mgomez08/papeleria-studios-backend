const express = require("express");
const AuthController = require("../controllers/auth");

const api = express.Router();

api.post("/signUp", AuthController.signUp);
api.post("/signIn", AuthController.signIn);

module.exports = api;
