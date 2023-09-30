const userModel = require("../models/users");
const Response = require("../utils/Response");
const { generateToken } = require("../utils/generateToken");

const login = async (req, res) => {
  const { success, failed } = new Response(res);
  const email = req.body.email?.toLowerCase();
  const password = req.body.password;

  if (email && password) {
    try {
      const userData = await userModel.findOne({ email, password });
      if (userData)
        return success("OK", {
          token: await generateToken({ id: userData._id }),
        });
    } catch (err) {}
    return failed("User not found", 404);
  }

  failed("Invalid user", 403);
};

module.exports = { login };
