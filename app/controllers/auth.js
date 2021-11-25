const { Usuario } = require("../models/index");
const { hashPassword, comparePassword } = require("../utils/bcryptUtils");
const { generateJWT } = require("../utils/jwt");

const signUp = async (req, res) => {
  let { nombre, correo, password } = req.body;
  if (!nombre || !correo || !password) {
    return res
      .status(400)
      .send({ ok: false, msg: "Todos los campos son obligatorios" });
  }
  if (password.length < 6) {
    return res.status(400).send({
      ok: false,
      msg: "La contraseña debe tener al menos 6 caracteres",
    });
  }
  try {
    const hash = await hashPassword(password);
    const user = await Usuario.create({
      nombre,
      correo,
      password: hash,
      id_rol: 1,
    });
    const token = await generateJWT(user.dataValues);
    return res.status(200).send({ ok: true, token });
  } catch (error) {
    console.error("Ocurrió el siguiente error:", error);
    return res.status(400).send({ ok: false, msg: error.message });
  }
};

const signIn = async (req, res) => {
  let { correo, password } = req.body;
  if (!correo || !password) {
    return res.status(400).send({
      ok: false,
      msg: "Todos los campos son obligatorios",
    });
  }
  try {
    const user = await Usuario.findOne({
      where: {
        correo: correo,
      },
    });
    if (!user) {
      return res.status(400).send({
        ok: false,
        msg: "Correo o contraseña incorrectas.",
      });
    }
    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      return res.status(400).send({
        ok: false,
        msg: "Correo o contraseña incorrectas.",
      });
    }
    const token = await generateJWT(user.dataValues);
    return res.status(200).send({ ok: true, token });
  } catch (error) {
    console.error("Ocurrió el siguiente error:", error);
    return res.status(400).send({ ok: false, msg: error.message });
  }
};

const refreshToken = async (req, res) => {
  const user = {
    id: req.user.id,
    nombre: req.user.nombre,
    correo: req.user.correo,
  };
  const token = await generateJWT(user);
  res.json({ ok: true, token });
};
module.exports = {
  signIn,
  signUp,
  refreshToken,
};
