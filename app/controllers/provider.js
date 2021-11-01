const { Proveedor } = require("../models/index");

const createProvider = async (req, res) => {
  const { nombre, contacto } = req.body;
  console.log(nombre);
};

module.exports = {
  createProvider,
};
