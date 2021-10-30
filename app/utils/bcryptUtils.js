const { rounds } = require("../../config/auth");
const bcrypt = require("bcryptjs");

async function hashPassword(password) {
  let salt = await bcrypt.genSalt(rounds);
  return await bcrypt.hash(password, salt);
}
async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

module.exports = {
  hashPassword,
  comparePassword,
};
