require("dotenv").config({ path: `${__dirname}/../../.env` });
const jwt = require("jsonwebtoken");
const Response = require("../utils/Response");

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const verifyToken = async (req, res, next) => {
  const { failed } = new Response(res);

  const token = req.headers.authorization?.split(" ").pop();

  if (!token) return failed("No token provided", 403);

  try {
    const data = await jwt.verify(token, ACCESS_TOKEN);
    req.data = data;
    next();
  } catch (err) {
    failed("Invalid token", 404);
  }
};

module.exports = { verifyToken };
