
const { error } = require("console");
const fs = require("fs");
const path = require("path");

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json');

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p, (error, fileContent) => {
            let cart = { products: [], totalPrice: 0 }
            if (!error) {
                cart = JSON.parse(fileContent)
            }
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.quantity++;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, quantity: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice += productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            })
        })
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (error, fileContent) => {
            if (error) {
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(
                prod => prod.id == id);
            const productQuatity = product.quantity;
            updatedCart.products = updatedCart.products.filter(
                prod => prod.id !== id);
            updatedCart.totalPrice =
                updatedCart.totalPrice - productPrice * productQuatity;
            fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                console.log(err);
            })
        });
    };
};