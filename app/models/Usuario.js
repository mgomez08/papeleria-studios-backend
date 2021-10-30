"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Usuario.init(
    {
      nombre: {
        type: DataTypes.STRING(80),
        allowNull: false,
        valide: {
          isAlpha: {
            msg: "El nombre no puede contener numeros",
          },
          len: [2, 80],
        },
      },
      correo: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "El correo no es valido",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        valide: {
          minLen(value) {
            if (value.length <= 6) {
              throw new Error("La contraseña debe tener más de 6 caracteres");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Usuario",
    }
  );
  return Usuario;
};
