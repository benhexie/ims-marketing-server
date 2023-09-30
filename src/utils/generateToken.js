require("dotenv").config({ path: `${__dirname}/../../.env` });
const jwt = require("jsonwebtoken")

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const generateToken = async ({id}) => {
    try {
        return await jwt.sign({id}, ACCESS_TOKEN)
    } catch (err) {
        return null;
    }
}

module.exports = { generateToken }