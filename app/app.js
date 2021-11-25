const express = require("express");
const app = express();
const { API_VERSION } = require("../config/variables");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Load routers
const authRoutes = require("./routers/auth");
const categoryRoutes = require("./routers/category");
const providerRoutes = require("./routers/provider");
const productRoutes = require("./routers/product");
const inventoryRoutes = require("./routers/inventory");
const orderRoutes = require("./routers/order");
const saleRoutes = require("./routers/sale");

//Configure header HTTP
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Routers
app.use(`/api/${API_VERSION}/auth`, authRoutes);
app.use(`/api/${API_VERSION}/category`, categoryRoutes);
app.use(`/api/${API_VERSION}/provider`, providerRoutes);
app.use(`/api/${API_VERSION}/product`, productRoutes);
app.use(`/api/${API_VERSION}/inventory`, inventoryRoutes);
app.use(`/api/${API_VERSION}/order`, orderRoutes);
app.use(`/api/${API_VERSION}/sale`, saleRoutes);

module.exports = app;
