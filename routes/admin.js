const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../util/path");
const products = [];

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
    res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

router.post("/add-product", (req, res) => {
    products.push({ title: req.body.title });
    res.redirect('/');
});

//module.exports = router;
exports.routes = router;
exports.products = products