const { Pedido } = require("../models/index");
const { createSales } = require("../controllers/sale");

const createOrder = async (req, res) => {
  let { sales } = req.body;
  if (!sales) {
    res.status(400).send({
      ok: false,
      msg: "Se requiere crear al menos una venta.",
    });
  }
  try {
    let valor_total = 0;
    sales.forEach((sale) => (valor_total += sale.valor_venta));

    //Crear pedido
    const order = await Pedido.create({
      valor_total,
    });
    //Asignar el id del pedido a cada una de las ventas
    sales = sales.map((sale) => ({
      ...sale,
      id_pedido: order.id,
    }));

    sales = await createSales(sales);

    return res.status(200).send({
      ok: true,
      msg: "Pedido creado correctamente.",
      order,
      sales,
    });
  } catch (error) {
    console.error("Ocurrió el siguiente error:", error);
    return res.status(500).send({
      ok: false,
      msg: "Error al crear el pedido",
    });
  }
};

const deleteOrder = async (id) => {
  if (!id) {
    console.log("No se ha enviado el id del pedido");
  }
  try {
    await Pedido.destroy({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Ocurrió el siguiente error:", error);
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Pedido.findAll({
      order: [["updated_at", "DESC"]],
    });
    return res.status(200).send({
      ok: true,
      orders,
    });
  } catch (error) {
    console.error("Ocurrió el siguiente error:", error);
    return res.status(500).send({
      ok: false,
      msg: "Error al obtener los pedidos.",
    });
  }
};
module.exports = {
  createOrder,
  deleteOrder,
  getOrders,
};
