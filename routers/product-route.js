const express = require("express");
const {
  addProducts,
  getProducts,
} = require("../controllers/product-controller");

const router = express.Router();

router.post("/", addProducts);
router.get("/", getProducts);

module.exports = router;
