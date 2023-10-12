
const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-product",
        {
            pageTitle: "Add Product",
            path: '/admin/add-product',
            editing: false
            // formsCSS: true,
            // productCSS: true,
            // activeAddProduct: true
        });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imageUrl, price, description);
    product.save();
    res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const prodId = req.params.productId;
    if (!editMode) {
        return res.redirect("/");
    }
    Product.findById(prodId, product => {
        if (!product) {
            return res.redirect("/");
        }
        res.render("admin/edit-product",
            {
                pageTitle: "Edit Product",
                path: '/admin/add-product',
                editing: editMode,
                product: product
            });
    })

};

exports.postEditProduct = (req, res, next) => {

};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(product => {
        res.render("admin/products", {
            prods: product,
            path: "/admin/products",
            pageTitle: "Admin Products"
        })
    })

};
