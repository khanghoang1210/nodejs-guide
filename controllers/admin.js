
const e = require("express");
const Product = require("../models/product");

exports.getAddProduct = (_req, res, _next) => {
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
    req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    })
        .then(result => {
            console.log("Created product");
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err))
};

exports.getEditProduct = (req, res, _next) => {
    const editMode = req.query.edit;
    const prodId = req.params.productId;
    if (!editMode) {
        return res.redirect("/");
    }

    //Product.findByPk(prodId).then(product => {
    req.user.getProducts({ where: { id: prodId } })
        .then(products => {
            const product = products[0];
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
        .catch(err => console.log(err));

};

exports.postEditProduct = (req, res, _next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    Product.findByPk(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.imageUrl = updatedImageUrl;
            product.description = updatedDescription;
            return product.save();
        })
        .then(_result => {
            console.log("Updated product!!");
            res.redirect("/admin/products");
        })
        .catch(err => console.log(err));
};


exports.getProducts = (req, res, next) => {
    req.user.getProducts().then(product => {
        res.render("admin/products", {
            prods: product,
            path: "/admin/products",
            pageTitle: "Admin Products"
        })
    })
        .catch(err => console.log(err))

};

exports.postDeleteProduct = (req, res, _next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId)
        .then(product => {
            return product.destroy();
        })
        .then(_result => {
            console.log("Destroyed product");
            res.redirect("/admin/products")
        })
        .catch(err => console.log(err));

}
