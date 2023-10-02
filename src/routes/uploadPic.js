const userModel = require("../models/users");
const { storeImage } = require("../utils/firebase");
const Response = require("../utils/response");

const uploadPic = async (req, res) => {
    const { success, failed } = new Response(res);
    const image = req.file;
    const _id = req.data.id;

    try {
        const ext = image.originalname.split(".").pop();
        const imagePath = await storeImage(image.buffer, ext);
        await userModel.findByIdAndUpdate({ _id }, { image: imagePath });

        return success("Profile pic updated", {
            image: imagePath,
        });
    } catch (err) {
        return failed(err.message, 403);
    }
}

module.exports = { uploadPic }