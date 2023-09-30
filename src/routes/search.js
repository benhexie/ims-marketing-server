const productModel = require("../models/products");
const Response = require("../utils/Response")

const search = async (req, res) => {
    const { success, failed } = new Response(res);
    const name = req.params.product

    if (!name) return failed("Invalid search", 403);

    try {
        const productsData = await productModel.find(
            { name: new RegExp(name, "i") }, 
            { user_id: 0 }
        );
        if (!productsData?.length) return success("No product found", []);
        return success("Products found", productsData);
    } catch (err) {
        console.error(err.message);
        failed("An error occured", 403);
    }
}

module.exports = { search }