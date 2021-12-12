const express = require("express");
const StatisticsController = require("../controllers/statistics");
const { validateJWT } = require("../middleware/validateToken");

const api = express.Router();

api.post("/", validateJWT, StatisticsController.getStatistics);

module.exports = api;
