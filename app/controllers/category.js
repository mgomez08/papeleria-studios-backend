const { Categoria } = require("../models/index");

const createCategory = async (req, res) => {
  let { nombre, descripcion } = req.body;
  if (!nombre || !descripcion) {
    return res.status(400).send({
      ok: false,
      msg: "Todos los campos son obligatorios",
    });
  }
  try {
    const category = await Categoria.create({
      nom_cat: nombre,
      des_cat: descripcion,
    });
    return res.status(200).send({
      ok: true,
      msg: "Categoria creada correctamente",
      category,
    });
  } catch (error) {
    console.error("Ocurrió el siguiente error:", error);
    res.status(500).send({
      ok: false,
      msg: "Error al crear la categoria",
    });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send({
      ok: false,
      msg: "El id de la categoría es obligatorio",
    });
  }
  try {
    await Categoria.destroy({
      where: {
        id,
      },
    });
    return res.status(200).send({
      ok: true,
      msg: "Categoria eliminada correctamente",
    });
  } catch (error) {
    console.error("Ocurrió el siguiente error:", error);
    res.status(500).send({
      ok: false,
      msg: "Error al eliminar la categoria",
    });
  }
};

const updateCategory = async (req, res) => {
  const { id, nombre, descripcion } = req.body;
  if (!id || !nombre || !descripcion) {
    return res.status(400).send({
      ok: false,
      msg: "Todos los campos son obligatorios",
    });
  }
  try {
    await Categoria.update(
      {
        nom_cat: nombre,
        des_cat: descripcion,
      },
      {
        where: {
          id,
        },
      }
    );
    const category = await Categoria.findOne({
      where: {
        id,
      },
    });
    return res.status(200).send({
      ok: true,
      msg: "Categoria actualizada correctamente",
      category,
    });
  } catch (error) {
    console.error("Ocurrió el siguiente error:", error);
    res.status(500).send({
      ok: false,
      msg: "Error al actualizar la categoria",
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Categoria.findAll({
      order: [["updated_at", "DESC"]],
    });
    return res.status(200).send({
      ok: true,
      msg: "Categorias obtenidas correctamente",
      categories,
    });
  } catch (error) {
    console.error("Ocurrió el siguiente error:", error);
    res.status(500).send({
      ok: false,
      msg: "Error al obtener las categorias",
    });
  }
};

module.exports = {
  createCategory,
  deleteCategory,
  updateCategory,
  getCategories,
};
