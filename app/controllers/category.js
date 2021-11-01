const { Categoria } = require("../models/index");

const createCategory = async (req, res) => {
  let { nombre, descripcion } = req.body;
  if (!nombre || !descripcion) {
    return res.status(400).send({
      ok: false,
      message: "Todos los campos son obligatorios",
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
      message: "Error al crear la categoria",
    });
  }
};
const deleteCategory = (req, res) => {
  const { id } = req.body;
  console.log(id);
};
const updateCategory = (req, res) => {
  const { id } = req.body;
  console.log(id);
};
const getCategories = (req, res) => {
  console.log("Categories");
};
module.exports = {
  createCategory,
  deleteCategory,
  updateCategory,
  getCategories,
};
