const productModel = require("../models/products");
const userModel = require("../models/users");
const Response = require("../utils/response");

const getMyData = async (req, res) => {
  const { success, failed } = new Response(res);
  const id = req.data.id;

  try {
    const productsData = await productModel.find(
      { user_id: id },
      { user_id: 0 },
    );
    const userData = await userModel.findOne({ _id: id }, { _id: 0 });
    if (!userData) failed("Invalid user", 404);
    if (productsData.length)
      return success("Products retrived sucessfully", {
        user: userData,
        products: productsData,
      });
    success("No products found", []);
  } catch (err) {
    failed("Products retrieval failed", 403);
  }
};

module.exports = { getMyData };
