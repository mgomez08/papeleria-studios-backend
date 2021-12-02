"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Categoria.hasMany(models.Producto, {
        foreignKey: "id_categoria",
      });
      models.Producto.belongsTo(models.Categoria, {
        foreignKey: "id_categoria",
      });
      models.Proveedor.hasMany(models.Producto, {
        foreignKey: "id_proveedor",
      });
      models.Producto.belongsTo(models.Proveedor, {
        foreignKey: "id_proveedor",
      });
    }
  }
  Producto.init(
    {
      nom_produc: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El nombre del producto es requerido",
          },
        },
      },
      valor_unitario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El valor unitario del producto es requerido",
          },
          isNumeric: {
            msg: "El valor unitario del producto debe ser numerico",
          },
        },
      },
      url_image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La url de la imagen del producto es requerida",
          },
          isUrl: {
            msg: "La url de la imagen del producto debe ser una url valida",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Producto",
      tableName: "productos",
    }
  );
  return Producto;
};
