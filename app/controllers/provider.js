const { Proveedor } = require("../models/index");

const createProvider = async (req, res) => {
  const { nombre, contacto } = req.body;
  if (!nombre || !contacto) {
    return res.status(400).send({
      ok: false,
      msg: "Todos los campos son obligatorios",
    });
  }
  try {
    const provider = await Proveedor.create({
      nom_prov: nombre,
      contacto_prov: contacto,
    });
    return res.status(200).send({
      ok: true,
      msg: "Proveedor creado correctamente",
      provider,
    });
  } catch (error) {
    console.error("Ocurrió el siguiente error:", error);
    return res.status(500).send({
      ok: false,
      msg: "Error al crear proveedor",
    });
  }
};

const deleteProvider = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send({
      ok: false,
      msg: "El id del proveedor es obligatorio",
    });
  }
  try {
    await Proveedor.destroy({
      where: {
        id,
      },
    });
    return res.status(200).send({
      ok: true,
      msg: "Proveedor eliminado correctamente",
    });
  } catch (error) {
    console.error("Ocurrió el siguiente error:", error);
    res.status(500).send({
      ok: false,
      msg: "Error al eliminar el proveedor",
    });
  }
};

const updateProvider = async (req, res) => {
  const { id, nombre, contacto } = req.body;
  if (!id || !nombre || !contacto) {
    return res.status(400).send({
      ok: false,
      msg: "Todos los campos son obligatorios",
    });
  }
  try {
    await Proveedor.update(
      {
        nom_prov: nombre,
        contacto_prov: contacto,
      },
      {
        where: {
          id,
        },
      }
    );
    const provider = await Proveedor.findOne({
      where: {
        id,
      },
    });
    return res.status(200).send({
      ok: true,
      msg: "Proveedor actualizado correctamente",
      provider,
    });
  } catch (error) {
    console.error("Ocurrió el siguiente error:", error);
    res.status(500).send({
      ok: false,
      msg: "Error al actualizar el proveedor",
    });
  }
};

const getProviders = async (req, res) => {
  try {
    const providers = await Proveedor.findAll({
      order: [["nom_prov", "ASC"]],
    });
    return res.status(200).send({
      ok: true,
      msg: "Proveedores obtenidos correctamente",
      providers,
    });
  } catch (error) {
    console.error("Ocurrió el siguiente error:", error);
    res.status(500).send({
      ok: false,
      msg: "Error al obtener los proveedores",
    });
  }
};

module.exports = {
  createProvider,
  deleteProvider,
  updateProvider,
  getProviders,
};
