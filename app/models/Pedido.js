"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Pedido.hasMany(models.Venta, {
        foreignKey: "id_pedido",
      });
      models.Venta.belongsTo(models.Pedido, {
        foreignKey: "id_pedido",
      });
    }
  }
  Pedido.init(
    {
      valor_total: {
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
    },
    {
      sequelize,
      modelName: "Pedido",
      tableName: "pedidos",
    }
  );
  return Pedido;
};
