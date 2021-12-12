const express = require("express");
const app = express();
const cors = require("cors");
const { API_VERSION } = require("../config/variables");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//Load routers
const authRoutes = require("./routers/auth");
const categoryRoutes = require("./routers/category");
const providerRoutes = require("./routers/provider");
const productRoutes = require("./routers/product");
const inventoryRoutes = require("./routers/inventory");
const orderRoutes = require("./routers/order");
const saleRoutes = require("./routers/sale");
const statiticsRoutes = require("./routers/statistics");

//Routers
app.use(`/api/${API_VERSION}/auth`, authRoutes);
app.use(`/api/${API_VERSION}/category`, categoryRoutes);
app.use(`/api/${API_VERSION}/provider`, providerRoutes);
app.use(`/api/${API_VERSION}/product`, productRoutes);
app.use(`/api/${API_VERSION}/inventory`, inventoryRoutes);
app.use(`/api/${API_VERSION}/order`, orderRoutes);
app.use(`/api/${API_VERSION}/sale`, saleRoutes);
app.use(`/api/${API_VERSION}/statistics`, statiticsRoutes);

module.exports = app;
