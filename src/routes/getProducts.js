const productModel = require("../models/products");
const Response = require("../utils/Response");

const getProducts = async (_, res) => {
  const { success, failed } = new Response(res);
  try {
    const productsData = await productModel.find({}, { user_id: 0 });
    if (productsData.length)
      return success("Products retrived sucessfully", productsData);
    success("No products found", []);
  } catch (err) {
    failed("Products retrieval failed", 403);
  }
};

module.exports = { getProducts };
