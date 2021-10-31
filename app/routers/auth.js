const express = require("express");
const AuthController = require("../controllers/auth");
const { validateJWT } = require("../middleware/validateToken");

const api = express.Router();

api.post("/signUp", AuthController.signUp);
api.post("/signIn", AuthController.signIn);
api.post("/refreshToken", validateJWT, AuthController.refreshToken);

module.exports = api;
