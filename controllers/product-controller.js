const asyncHandler = require("express-async-handler");
const Product = require("../models/product-model");

// create product
const addProducts = asyncHandler(async (req, res) => {
  const { name, price, category } = req.body;
  if (!name || !price || !category) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const existProduct = await Product.findOne({ name });
  if (existProduct) {
    res.status(400);
    throw new Error("Product already exist");
  }
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  });

  await product
    .save()
    .then(() => {
      res.status(201).json(product);
    })
    .catch((error) => {
      res.status(500);
      throw new Error(error);
    });
});

// get all products

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

module.exports = {
  addProducts,
  getProducts,
};
