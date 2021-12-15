const {
  Inventario,
  Venta,
  Producto,
  Categoria,
  Proveedor,
  Pedido,
} = require("../models/index");
const sequelize = require("sequelize");
const { Op } = require("sequelize");

const slice = 5;

const getStatistics = async (req, res) => {
  let { startDate, endDate } = req.body;
  if (!startDate || !endDate) {
    return res.status(400).json({
      ok: false,
      msg: "Debe seleccionar las fechas para obtener las estadísticas",
    });
  }
  try {
    const { PMostSelled, PLessSelled } = await getMostAndLessSelled(
      startDate,
      endDate
    );
    const { PMostSalesRecords, PLessSalesRecords } =
      await getMostAndLessSalesRecords(startDate, endDate);
    const { PHighestQuantitySold, PLessQuantitySold } =
      await getHighestAndLessQuantitySold(startDate, endDate);
    const { CMoreProducts, CFewerProducts } =
      await getCategoriesMoreAndFewerProducts(startDate, endDate);
    const { PrFewerProducts, PrMoreProducts } =
      await getProvidersMoreAndFewerProducts(startDate, endDate);
    const TotallyDataSystem = await getTotallyDataSystem();

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
        TotallyDataSystem,
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

const getMostAndLessSelled = async (startDate, endDate) => {
  let PMostSelled = await Venta.findAll({
    attributes: [
      "id",
      [sequelize.fn("sum", sequelize.col("valor_venta")), "valor_total"],
    ],
    where: {
      created_at: {
        [Op.between]: [startDate, endDate],
      },
    },
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
  PLessSelled = PLessSelled.slice(0, slice);
  PMostSelled = PMostSelled.sort(function (a, b) {
    return b.dataValues.valor_total - a.dataValues.valor_total;
  });
  PMostSelled = PMostSelled.slice(0, slice);
  return {
    PMostSelled,
    PLessSelled,
  };
};

const getMostAndLessSalesRecords = async (startDate, endDate) => {
  let PMostSalesRecords = await Venta.findAll({
    attributes: [
      "id",
      [
        sequelize.fn("count", sequelize.col("id_inventario")),
        "registros_venta",
      ],
    ],
    where: {
      created_at: {
        [Op.between]: [startDate, endDate],
      },
    },
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
  PLessSalesRecords = PLessSalesRecords.slice(0, slice);
  PMostSalesRecords = PMostSalesRecords.sort(function (a, b) {
    return b.dataValues.registros_venta - a.dataValues.registros_venta;
  });
  PMostSalesRecords = PMostSalesRecords.slice(0, slice);

  return {
    PMostSalesRecords,
    PLessSalesRecords,
  };
};

const getHighestAndLessQuantitySold = async (startDate, endDate) => {
  let PHighestQuantitySold = await Venta.findAll({
    attributes: [
      "id",
      [
        sequelize.fn("sum", sequelize.col("cant_producto")),
        "cantidad_productos",
      ],
    ],
    where: {
      created_at: {
        [Op.between]: [startDate, endDate],
      },
    },
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
  PLessQuantitySold = PLessQuantitySold.slice(0, slice);
  PHighestQuantitySold = PHighestQuantitySold.sort(function (a, b) {
    return b.dataValues.cantidad_productos - a.dataValues.cantidad_productos;
  });
  PHighestQuantitySold = PHighestQuantitySold.slice(0, slice);

  return {
    PHighestQuantitySold,
    PLessQuantitySold,
  };
};

const getCategoriesMoreAndFewerProducts = async (startDate, endDate) => {
  let CMoreProducts = await Producto.findAll({
    attributes: [
      "id",
      [
        sequelize.fn("count", sequelize.col("id_categoria")),
        "cantidad_productos",
      ],
    ],
    group: "id_categoria",
    where: {
      created_at: {
        [Op.between]: [startDate, endDate],
      },
    },
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
  CFewerProducts = CFewerProducts.slice(0, slice);
  CMoreProducts = CMoreProducts.sort(function (a, b) {
    return b.dataValues.cantidad_productos - a.dataValues.cantidad_productos;
  });
  CMoreProducts = CMoreProducts.slice(0, slice);

  return {
    CMoreProducts,
    CFewerProducts,
  };
};

const getProvidersMoreAndFewerProducts = async (startDate, endDate) => {
  let PrMoreProducts = await Producto.findAll({
    attributes: [
      "id",
      [
        sequelize.fn("count", sequelize.col("id_proveedor")),
        "cantidad_productos",
      ],
    ],
    group: "id_proveedor",
    where: {
      created_at: {
        [Op.between]: [startDate, endDate],
      },
    },
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
  PrFewerProducts = PrFewerProducts.slice(0, slice);
  PrMoreProducts = PrMoreProducts.sort(function (a, b) {
    return b.dataValues.cantidad_productos - a.dataValues.cantidad_productos;
  });
  PrMoreProducts = PrMoreProducts.slice(0, slice);

  return {
    PrFewerProducts,
    PrMoreProducts,
  };
};

const getTotallyDataSystem = async () => {
  let totalProducts = await Producto.count();
  let totalCategories = await Categoria.count();
  let totalProviders = await Proveedor.count();
  let totalOrders = await Pedido.count();
  let totalSales = await Venta.count();
  return {
    totalProducts,
    totalCategories,
    totalProviders,
    totalOrders,
    totalSales,
  };
};

const getProductsMostSelled = async (req, res) => {
  try {
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
              include: [
                {
                  model: Proveedor,
                },
              ],
            },
          ],
        },
      ],
    });
    PHighestQuantitySold = PHighestQuantitySold.sort(function (a, b) {
      return b.dataValues.cantidad_productos - a.dataValues.cantidad_productos;
    });
    PHighestQuantitySold = PHighestQuantitySold.slice(0, 5);
    return res.status(200).send({
      ok: true,
      msg: "Productos obtenidos correctamente",
      data: PHighestQuantitySold,
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
  getStatistics,
  getProductsMostSelled,
};
