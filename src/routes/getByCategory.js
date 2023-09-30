const productModel = require("../models/products");
const Response = require("../utils/Response")

const getByCategory = async (req, res) => {
    const { success, failed } = new Response(res);
    const category = req.params.category;
    const filter = {};
    if (category && category !== "_") filter.category = category

    try {
        const productsData = await productModel.find(filter, { user_id: 0 });
        if (productsData.length) return success("Products retrived sucessfully", productsData);
        success("Products not found", []);
    } catch (err) {
        failed("Products retrieval failed", 403);
    }
}

module.exports = { getByCategory }