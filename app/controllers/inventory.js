const { Inventario, Producto } = require("../models/index");

const createInventory = async (req, res) => {
  let { cantidad, id_producto } = req.body;
  if (!cantidad || !id_producto) {
    return res.status(400).send({
      ok: false,
      msg: "Todos los campos son obligatorios",
    });
  }
  try {
    let inventory = await Inventario.create({
      can_total: cantidad,
      id_producto,
    });
    inventory = await Inventario.findOne({
      where: {
        id: inventory.id,
      },
      include: [
        {
          model: Producto,
          attributes: ["id", "nom_produc"],
        },
      ],
    });
    return res.status(200).send({
      ok: true,
      msg: "Inventario creado correctamente",
      inventory,
    });
  } catch (error) {
    console.error("Ocurrió el siguiente error:", error);
    return res.status(500).send({
      ok: false,
      msg: "Error al crear el inventario del producto",
    });
  }
};

const deleteInventory = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).send({
      ok: false,
      msg: "El id del inventario es obligatorio",
    });
  }
  try {
    await Inventario.destroy({
      where: {
        id,
      },
    });
    return res.status(200).send({
      ok: true,
      msg: "Inventario eliminado correctamente",
    });
  } catch (error) {
    console.error("Ocurrió el siguiente error:", error);
    return res.status(500).send({
      ok: false,
      msg: "Error al eliminar el inventario el producto",
    });
  }
};

const updateInventory = async (req, res) => {
  const { id, cantidad, id_producto } = req.body;
  if (!id || !cantidad || !id_producto) {
    return res.status(400).send({
      ok: false,
      msg: "Todos los campos son obligatorios",
    });
  }
  try {
    await Inventario.update(
      {
        can_total: cantidad,
        id_producto,
      },
      {
        where: {
          id,
        },
      }
    );
    const inventory = await Inventario.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Producto,
          attributes: ["id", "nom_produc"],
        },
      ],
    });
    return res.status(200).send({
      ok: true,
      msg: "Inventario actualizado correctamente",
      inventory,
    });
  } catch (error) {
    console.error("Ocurrió el siguiente error:", error);
    return res.status(500).send({
      ok: false,
      msg: "Error al actualizar el producto",
    });
  }
};

const getInventory = async (req, res) => {
  try {
    const inventory = await Inventario.findAll({
      order: [["updated_at", "DESC"]],
      include: [
        {
          model: Producto,
          attributes: ["id", "nom_produc"],
        },
      ],
    });
    return res.status(200).send({
      ok: true,
      msg: "Inventario obtenido correctamente",
      inventory,
    });
  } catch (error) {
    console.error("Ocurrió el siguiente error:", error);
    return res.status(500).send({
      ok: false,
      msg: "Error al obtener el inventario",
    });
  }
};
module.exports = {
  createInventory,
  deleteInventory,
  updateInventory,
  getInventory,
};
