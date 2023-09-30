const Response = require("../utils/Response")

const verify = (_, res) => {
    const  { success } = new Response(res);
    success("OK", {});
}

module.exports = { verify }