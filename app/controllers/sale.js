const { response } = require("express");
const { Venta } = require("../models/index");
const { deleteOrder } = require("./order");

const createSales = async (sales) => {
  console.log(sales);
  if (!sales) {
    return res.status(400).json({
      ok: false,
      msg: "La lista de ventas obligatoria",
    });
  }
  try {
    return Venta.bulkCreate(sales, { validate: true });
  } catch (error) {
    console.error("Ocurrió el siguiente error:", error);
    deleteOrder(sales[0].id_pedido);
  }
};

const getSales = async (req, res) => {
  try {
    const sales = await Venta.findAll({
      order: [["updated_at", "DESC"]],
    });
    return res.status(200).send({
      ok: true,
      msg: "Ventas obtenidas correctamente",
      sales,
    });
  } catch (error) {
    console.error("Ocurrió el siguiente error:", error);
    return res.status(500).send({
      ok: false,
      msg: "Error al obtener las ventas",
    });
  }
};

module.exports = {
  createSales,
  getSales,
};
