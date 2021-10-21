const sequelize = require("../database/db");

function test(req, res) {
  try {
    sequelize.authenticate().then(() => {
      console.log("Conexión satisfactioria");
    });
  } catch (error) {
    console.error("Ocurrió el siguiente error:", error);
  }
  console.log(req.body.msg + "xd");
  res.status(200).send({ msg: `nice ${req.body.msg}` });
}
module.exports = {
  test,
};
