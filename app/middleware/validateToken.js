const jwt = require("jsonwebtoken");
const { secretKey } = require("../../config/auth");

const validateJWT = (req, res, next) => {
  try {
    const token = req.header("x-token");
    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: "No hay token en la cabecera",
      });
    }
    const { id, nombre, correo } = jwt.verify(token, secretKey);
    req.user = {
      id,
      nombre,
      correo,
    };
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no valido",
    });
  }
};

module.exports = {
  validateJWT,
};
