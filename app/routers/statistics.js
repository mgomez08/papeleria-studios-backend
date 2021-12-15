const express = require("express");
const StatisticsController = require("../controllers/statistics");
const { validateJWT } = require("../middleware/validateToken");

const api = express.Router();

api.post("/", validateJWT, StatisticsController.getStatistics);
api.get("/productsmostselled", StatisticsController.getProductsMostSelled);

module.exports = api;
