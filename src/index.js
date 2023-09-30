require("dotenv").config({ path: `${__dirname}/../.env` });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { login } = require("./routes/login");
const { signup } = require("./routes/signup");
const { getProducts } = require("./routes/getProducts");
const { getProduct } = require("./routes/getProduct");
const { createProduct } = require("./routes/createProduct");
const { verifyToken } = require("./middleware/verifyToken");
const { verify } = require("./routes/verify");
const { getByCategory } = require("./routes/getByCategory");
const multer = require("multer");
const { search } = require("./routes/search");
const { getMyData } = require("./routes/getMyData");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
});

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/products", getProducts);
app.get("/my-products", verifyToken, getMyData);
app.get("/product/:id", getProduct);
app.get("/category/:category", getByCategory);
app.get("/verify", verifyToken, verify);
app.get("/search/:product", search);

app.post("/login", login);
app.post("/signup", signup);
app.post("/product", upload.single("image"), verifyToken, createProduct);

const listener = app.listen(process.env.PORT || 8080, () => {
  console.log(`Server listening on ${listener.address().port}`);
});
