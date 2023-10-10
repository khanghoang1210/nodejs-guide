
const { error } = require("console");
const e = require("express");
const fs = require("fs");
const path = require("path");
const products = [];

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'products.json');

const getProductsFromFile = callback => {
    fs.readFile(p, (error, fileContent) => {
        if (error) {
            callback([]);
        }
        callback(JSON.parse(fileContent));
    });
}
module.exports = class Product {

    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;

    };

    save() {
        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (error) => {
                console.log(error);
            })
        })
    }

    static fetchAll(callback) {
        getProductsFromFile(callback)
    }
};
