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

module.exports = {
  createSales,
};
