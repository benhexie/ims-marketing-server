class Response {
  constructor(res) {
    this.res = res;
  }

  success = (message, data, code = 200) => {
    this.res.status(code).json({
      status: "success",
      message,
      data,
    });
  };

  failed = (message, code = 400) => {
    this.res.status(code).json({
      status: "error",
      message,
    });
  };
}

module.exports = Response;
