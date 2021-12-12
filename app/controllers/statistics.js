const {
  Inventario,
  Venta,
  Producto,
  Categoria,
  Proveedor,
} = require("../models/index");
const sequelize = require("sequelize");

const getStatistics = async (req, res) => {
  let { startDate, endDate } = req.body;
  if (!startDate || !endDate) {
    return res.status(400).json({
      ok: false,
      msg: "Debe seleccionar las fechas para obtener las estadísticas",
    });
  }
  try {
    const { PMostSelled, PLessSelled } = await getMostAndLessSelled();
    const { PMostSalesRecords, PLessSalesRecords } =
      await getMostAndLessSalesRecords();
    const { PHighestQuantitySold, PLessQuantitySold } =
      await getHighestAndLessQuantitySold();
    const { CMoreProducts, CFewerProducts } =
      await getCategoriesMoreAndFewerProducts();
    const { PrFewerProducts, PrMoreProducts } =
      await getProvidersMoreAndFewerProducts();

    return res.status(200).send({
      ok: true,
      msg: "Estadisticas generadas correctamente",
      data: {
        PMostSelled,
        PMostSalesRecords,
        PHighestQuantitySold,
        CMoreProducts,
        PrMoreProducts,
        PLessSelled,
        PLessSalesRecords,
        PLessQuantitySold,
        CFewerProducts,
        PrFewerProducts,
      },
    });
  } catch (error) {
    console.error("Ocurrió el siguiente error:", error);
    return res.status(500).send({
      ok: false,
      msg: "Error al crear las estadísticas",
    });
  }
};

const getMostAndLessSelled = async () => {
  let PMostSelled = await Venta.findAll({
    attributes: [
      "id",
      [sequelize.fn("sum", sequelize.col("valor_venta")), "valor_total"],
    ],
    group: "id_inventario",
    include: [
      {
        model: Inventario,
        attributes: ["id"],
        include: [
          {
            model: Producto,
            attributes: ["id", "nom_produc"],
          },
        ],
      },
    ],
  });
  let PLessSelled = PMostSelled.sort(function (a, b) {
    return a.dataValues.valor_total - b.dataValues.valor_total;
  });
  PLessSelled = PLessSelled.slice(0, 10);
  PMostSelled = PMostSelled.sort(function (a, b) {
    return b.dataValues.valor_total - a.dataValues.valor_total;
  });
  PMostSelled = PMostSelled.slice(0, 10);
  return {
    PMostSelled,
    PLessSelled,
  };
};

const getMostAndLessSalesRecords = async () => {
  let PMostSalesRecords = await Venta.findAll({
    attributes: [
      "id",
      [
        sequelize.fn("count", sequelize.col("id_inventario")),
        "registros_venta",
      ],
    ],
    group: "id_inventario",
    include: [
      {
        model: Inventario,
        attributes: ["id"],
        include: [
          {
            model: Producto,
            attributes: ["id", "nom_produc"],
          },
        ],
      },
    ],
  });
  let PLessSalesRecords = PMostSalesRecords.sort(function (a, b) {
    return a.dataValues.registros_venta - b.dataValues.registros_venta;
  });
  PLessSalesRecords = PLessSalesRecords.slice(0, 10);
  PMostSalesRecords = PMostSalesRecords.sort(function (a, b) {
    return b.dataValues.registros_venta - a.dataValues.registros_venta;
  });
  PMostSalesRecords = PMostSalesRecords.slice(0, 10);

  return {
    PMostSalesRecords,
    PLessSalesRecords,
  };
};

const getHighestAndLessQuantitySold = async () => {
  let PHighestQuantitySold = await Venta.findAll({
    attributes: [
      "id",
      [
        sequelize.fn("sum", sequelize.col("cant_producto")),
        "cantidad_productos",
      ],
    ],
    group: "id_inventario",
    include: [
      {
        model: Inventario,
        attributes: ["id"],
        include: [
          {
            model: Producto,
            attributes: ["id", "nom_produc"],
          },
        ],
      },
    ],
  });
  let PLessQuantitySold = PHighestQuantitySold.sort(function (a, b) {
    return a.dataValues.cantidad_productos - b.dataValues.cantidad_productos;
  });
  PLessQuantitySold = PLessQuantitySold.slice(0, 10);
  PHighestQuantitySold = PHighestQuantitySold.sort(function (a, b) {
    return b.dataValues.cantidad_productos - a.dataValues.cantidad_productos;
  });
  PHighestQuantitySold = PHighestQuantitySold.slice(0, 10);

  return {
    PHighestQuantitySold,
    PLessQuantitySold,
  };
};

const getCategoriesMoreAndFewerProducts = async () => {
  let CMoreProducts = await Producto.findAll({
    attributes: [
      "id",
      [
        sequelize.fn("count", sequelize.col("id_categoria")),
        "cantidad_productos",
      ],
    ],
    group: "id_categoria",
    include: [
      {
        model: Categoria,
        attributes: ["id", "nom_cat"],
      },
    ],
  });
  CMoreProducts = CMoreProducts.map((statistic) => {
    let tmp = statistic.dataValues.Categorium;
    delete statistic.dataValues.Categorium;
    statistic.dataValues.Categoria = tmp;
    return statistic;
  });
  let CFewerProducts = CMoreProducts.sort(function (a, b) {
    return a.dataValues.cantidad_productos - b.dataValues.cantidad_productos;
  });
  CFewerProducts = CFewerProducts.slice(0, 10);
  CMoreProducts = CMoreProducts.sort(function (a, b) {
    return b.dataValues.cantidad_productos - a.dataValues.cantidad_productos;
  });
  CMoreProducts = CMoreProducts.slice(0, 10);

  return {
    CMoreProducts,
    CFewerProducts,
  };
};

const getProvidersMoreAndFewerProducts = async () => {
  let PrMoreProducts = await Producto.findAll({
    attributes: [
      "id",
      [
        sequelize.fn("count", sequelize.col("id_proveedor")),
        "cantidad_productos",
      ],
    ],
    group: "id_proveedor",
    include: [
      {
        model: Proveedor,
        attributes: ["id", "nom_prov"],
      },
    ],
  });
  let PrFewerProducts = PrMoreProducts.sort(function (a, b) {
    return a.dataValues.cantidad_productos - b.dataValues.cantidad_productos;
  });
  PrFewerProducts = PrFewerProducts.slice(0, 10);
  PrMoreProducts = PrMoreProducts.sort(function (a, b) {
    return b.dataValues.cantidad_productos - a.dataValues.cantidad_productos;
  });
  PrMoreProducts = PrMoreProducts.slice(0, 10);

  return {
    PrFewerProducts,
    PrMoreProducts,
  };
};

module.exports = {
  getStatistics,
};
