"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Proveedor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Proveedor.init(
    {
      nom_prov: {
        type: DataTypes.STRING(80),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El nombre del proveedor es requerido",
          },
        },
      },
      contacto_prov: {
        type: DataTypes.STRING(80),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El contacto del proveedor es requerido",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Proveedor",
      tableName: "proveedores",
    }
  );
  return Proveedor;
};
