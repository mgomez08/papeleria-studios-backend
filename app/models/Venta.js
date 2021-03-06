"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Venta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Usuario.hasMany(models.Venta, {
        foreignKey: "id_usuario",
      });
      models.Venta.belongsTo(models.Usuario, {
        foreignKey: "id_usuario",
      });
    }
  }
  Venta.init(
    {
      cant_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La cantidad de producto es requerida",
          },
          isNumeric: {
            msg: "La cantidad de producto debe ser un número",
          },
        },
      },
      valor_venta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El valor de venta es requerido",
          },
          isNumeric: {
            msg: "El valor de venta debe ser un número",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Venta",
      tableName: "ventas",
    }
  );
  return Venta;
};
