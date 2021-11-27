const { secretKey, expiresIn } = require("../../config/auth");
const jwt = require("jsonwebtoken");

const generateJWT = (usuario) => {
  return new Promise((resolve, reject) => {
    const payload = {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
    };
    jwt.sign(payload, secretKey, { expiresIn }, (err, token) => {
      if (err) {
        console.log(err);
        reject("No se pudo generar el token, intente de nuevo.");
      }
      resolve(token);
    });
  });
};

module.exports = {
  generateJWT,
};
