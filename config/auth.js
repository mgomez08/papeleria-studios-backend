require("dotenv").config();

module.exports = {
  secretKey: process.env.AUTH_SECRET_KEY,
  expiresIn: process.env.AUTH_EXPIRES,
  rounds: parseInt(process.env.AUTH_ROUNDS),
};
