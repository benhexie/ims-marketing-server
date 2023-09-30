const productModel = require("../models/products");
const userModel = require("../models/users");
const Response = require("../utils/response");

const getProduct = async (req, res) => {
  const { success, failed } = new Response(res);
  const _id = req.params.id;

  try {
    const productData = await productModel.findOne({ _id });
    const userData = await userModel.findOne(
      { _id: productData.user_id },
      { email: 1, image: 1, name: 1 },
    );
    if (productData)
      return success("Product retrived sucessfully", {
        name: productData.name,
        image: productData.image,
        price: productData.price,
        phone: productData.phone,
        description: productData.description,
        email: userData.email,
        location: productData.location,
        user_name: userData.name,
        user_image: userData.image,
      });
    return failed("Product not found", 404);
  } catch (err) {
    failed("Product retrieval failed", 403);
  }
};

module.exports = { getProduct };
