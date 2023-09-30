const userModel = require("../models/users");
const Response = require("../utils/Response");
const { generateToken } = require("../utils/generateToken");

const signup = async (req, res) => {
  const { success, failed } = new Response(res);
  const name = req.body.name;
  const email = req.body.email?.toLowerCase();
  const password = req.body.password;
  const phone = req.body.phone;

  if (name && email && phone && password) {
    const newUser = new userModel({ name, email, phone, password });

    try {
      const userData = await newUser.save();
      return success("OK", {
        token: await generateToken({ id: userData._id }),
      });
    } catch (err) {
      console.log(err.message);
      return failed(err.message, 403);
    }
  }

  failed("Invalid user", 403);
};

module.exports = { signup };
