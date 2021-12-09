"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Inventario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Producto.hasOne(models.Inventario, {
        foreignKey: {
          name: "id_producto",
          allowNull: false,
          unique: true,
        },
      });
      models.Inventario.belongsTo(models.Producto, {
        foreignKey: {
          name: "id_producto",
          allowNull: false,
          unique: true,
        },
      });
      models.Inventario.hasMany(models.Venta, {
        foreignKey: {
          name: "id_inventario",
        },
      });
      models.Venta.belongsTo(models.Inventario, {
        foreignKey: {
          name: "id_inventario",
        },
      });
    }
  }
  Inventario.init(
    {
      can_total: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El campo cantidad total no puede estar vacio",
          },
          isNumeric: {
            msg: "El campo cantidad total debe ser numerico",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Inventario",
      tableName: "inventario",
    }
  );
  return Inventario;
};
