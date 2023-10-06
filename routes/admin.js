const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../util/path");
const productsController = require("../controllers/products");


// /admin/add-product => GET
router.get("/add-product", productsController.getAddProduct);

router.post("/add-product", productsController.postAddProduct);

//module.exports = router;
module.exports = router;