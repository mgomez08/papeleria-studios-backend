const { Producto, Categoria, Proveedor } = require("../models/index");

const createProduct = async (req, res) => {
  let { nombre, precio, url_image, id_categoria, id_proveedor } = req.body;
  if (!nombre || !precio || !url_image || !id_categoria || !id_proveedor) {
    return res.status(400).send({
      ok: false,
      msg: "Todos los campos son obligatorios",
    });
  }
  try {
    let product = await Producto.create({
      nom_produc: nombre,
      valor_unitario: precio,
      id_categoria,
      id_proveedor,
      url_image,
    });
    product = await Producto.findOne({
      where: {
        id: product.id,
      },
      include: [
        {
          model: Categoria,
          attributes: ["id", "nom_cat"],
        },
        {
          model: Proveedor,
          attributes: ["id", "nom_prov"],
        },
      ],
    });

    let tmp = product.dataValues.Categorium;
    delete product.dataValues.Categorium;
    product.dataValues.Categoria = tmp;

    return res.status(200).send({
      ok: true,
      msg: "Producto creado correctamente",
      product,
    });
  } catch (error) {
    console.error("Ocurrió el siguiente error:", error);
    return res.status(500).send({
      ok: false,
      msg: "Error al crear el producto",
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).send({
      ok: false,
      msg: "El id del producto es obligatorio",
    });
  }
  try {
    await Producto.destroy({
      where: {
        id,
      },
    });
    return res.status(200).send({
      ok: true,
      msg: "Producto eliminado correctamente",
    });
  } catch (error) {
    console.error("Ocurrió el siguiente error:", error);
    return res.status(500).send({
      ok: false,
      msg: "Error al eliminar el producto",
    });
  }
};

const updateProduct = async (req, res) => {
  let { id, nombre, precio, url_image, id_categoria, id_proveedor } = req.body;
  if (
    (!id, !nombre || !precio || !url_image || !id_categoria || !id_proveedor)
  ) {
    return res.status(400).send({
      ok: false,
      msg: "Todos los campos son obligatorios",
    });
  }
  try {
    await Producto.update(
      {
        nom_produc: nombre,
        valor_unitario: precio,
        url_image,
        id_categoria,
        id_proveedor,
      },
      {
        where: {
          id,
        },
      }
    );
    const product = await Producto.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Categoria,
          attributes: ["id", "nom_cat"],
        },
        {
          model: Proveedor,
          attributes: ["id", "nom_prov"],
        },
      ],
    });
    let tmp = product.dataValues.Categorium;
    delete product.dataValues.Categorium;
    product.dataValues.Categoria = tmp;

    return res.status(200).send({
      ok: true,
      msg: "Producto actualizado correctamente",
      product,
    });
  } catch (error) {
    console.error("Ocurrió el siguiente error:", error);
    return res.status(500).send({
      ok: false,
      msg: "Error al actualizar el producto",
    });
  }
};

const getProducts = async (req, res) => {
  try {
    let products = await Producto.findAll({
      order: [["nom_produc", "ASC"]],
      include: [
        {
          model: Categoria,
          attributes: ["id", "nom_cat"],
        },
        {
          model: Proveedor,
          attributes: ["id", "nom_prov"],
        },
      ],
    });
    products = products.map((product) => {
      let tmp = product.dataValues.Categorium;
      delete product.dataValues.Categorium;
      product.dataValues.Categoria = tmp;
      return product;
    });
    return res.status(200).send({
      ok: true,
      msg: "Productos obtenidos correctamente",
      products,
    });
  } catch (error) {
    console.error("Ocurrió el siguiente error:", error);
    return res.status(500).send({
      ok: false,
      msg: "Error al obtener los productos",
    });
  }
};

const getProductsForUser = async (req, res) => {
  try {
    let categoriasWithProducts = await Categoria.findAll({
      order: [["nom_cat", "ASC"]],
      include: [
        {
          model: Producto,
          include: [
            {
              model: Proveedor,
              attributes: ["id", "nom_prov"],
            },
          ],
        },
      ],
    });

    return res.status(200).send({
      ok: true,
      msg: "Productos obtenidos correctamente",
      data: categoriasWithProducts,
    });
  } catch (error) {
    console.error("Ocurrió el siguiente error:", error);
    return res.status(500).send({
      ok: false,
      msg: "Error al obtener los productos",
    });
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getProducts,
  getProductsForUser,
};
