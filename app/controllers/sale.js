const { response } = require("express");
const { Venta, Inventario } = require("../models/index");
const { deleteOrder } = require("./order");

const createSales = async (sales) => {
  if (!sales) {
    return res.status(400).json({
      ok: false,
      msg: "La lista de ventas obligatoria",
    });
  }
  try {
    const salesResult = await Venta.bulkCreate(sales, { validate: true });
    salesResult.forEach(async (sale) => {
      await Inventario.increment(
        { can_total: -sale.cant_producto },
        { where: { id: sale.id_inventario } }
      );
    });
    return salesResult;
  } catch (error) {
    console.error("Ocurrió el siguiente error:", error);
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
