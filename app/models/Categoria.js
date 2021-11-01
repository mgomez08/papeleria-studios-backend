"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Categoria.init(
    {
      nom_cat: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El nombre de la categoria es requerido",
          },
        },
      },
      des_cat: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La descripcion de la categoria es requerida",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Categoria",
      tableName: "categorias",
    }
  );
  return Categoria;
};
