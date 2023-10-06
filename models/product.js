
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

    constructor(title) {
        this.title = title;
    };

    save() {
        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (error) => {
                console.log(error);
            })
        })
    }

    static fetAll(callback) {
        getProductsFromFile(callback)
    }
};
