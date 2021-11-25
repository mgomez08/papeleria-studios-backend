"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Rol.hasMany(models.Usuario, {
        foreignKey: "id_rol",
      });
      models.Usuario.belongsTo(models.Rol, {
        foreignKey: "id_rol",
      });
    }
  }
  Rol.init(
    {
      nombre: {
        type: DataTypes.STRING(80),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El nombre del rol es requerido",
          },
          isAlpha: {
            msg: "El nombre del rol no puede contener numeros",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Rol",
      tableName: "roles",
    }
  );
  return Rol;
};
