const Response = require("../utils/response");

const verify = (_, res) => {
  const { success } = new Response(res);
  success("OK", {});
};

module.exports = { verify };
