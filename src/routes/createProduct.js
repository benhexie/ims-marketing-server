const productModel = require("../models/products");
const userModel = require("../models/users");
const Response = require("../utils/Response");
const { storeImage } = require("../utils/firebase");

const createProduct = async (req, res) => {
    const { success, failed } = new Response(res)

    const image = req.file;
    const name = req.body.name;
    const category = req.body.category;
    const price = req.body.price;
    const description = req.body.description;
    const _id = req.data.id
    const location = req.body.location;
    
    if (!image || !name || !location || !category || !price || !description) {
        return failed("Product not created", 403);
    }
    
    try {
        const ext = image.originalname.split(".").pop();
        const imagePath = await storeImage(image.buffer, ext);
        const userData = await userModel.findOne({ _id }, { phone: 1 })
        if (!userData) return failed("Invalid user", 404);
        
        const newProduct = new productModel({
            user_id: _id,
            image: imagePath,
            location,
            name,
            category,
            price,
            description,
            phone: userData.phone
        });
        await newProduct.save();
        
        return success("New product created", {
            image: imagePath,
            name,
            category,
            price,
            description
        })
    } catch (err) {
        return failed(err.message, 403);
    }
}

module.exports = { createProduct }