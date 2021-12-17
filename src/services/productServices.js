const mongoose = require("mongoose");
const uuid = require("uuid");

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

const fetchAllProducts = (req, res) =>
  Product.find()
    .then((allProducts) => res.send(allProducts))
    .catch((error) => {
      console.log("error occurred while fetching products from db");
    });

const uploadProduct = (req, res) => {
  // 1. We need to grab the product data coming from the request.
  // put the product data on postman [x]
  const payload = req.body;
  console.log("payload:", payload);

  // 2.insert that data in the database.
  product = new Product({
    id: uuid.v4(),
    title: payload.title,
    description: payload.description,
    brand: payload.brand,
    price: payload.price,
    image: payload.img,
  });

  product.save(function (err, data) {
    if (err) throw err;
    return res.send(data);
  });
};

const ProductService = {
  fetchAllProducts,
  uploadProduct,
};

module.exports = ProductService;
