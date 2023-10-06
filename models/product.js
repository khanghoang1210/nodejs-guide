
const { error } = require("console");
const e = require("express");
const fs = require("fs");
const path = require("path");
const products = [];
const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'products.json');

module.exports = class Product {

    constructor(title) {
        this.title = title;
    };

    save() {

        fs.readFile(p, (error, fileContent) => {
            let products = [];
            if (!error) {
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (error) => {
                console.log(error);
            })
        })

    }

    static fetAll(callback) {
        fs.readFile(p, (error, fileContent) => {
            if (error) {
                callback([]);
            }
            callback(JSON.parse(fileContent));
        });
    }
};