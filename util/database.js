// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("node-app", "root", "12102003", {
//     dialect: 'mysql',
//     host: 'localhost'
// });

// module.exports = sequelize;
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(
        "mongodb+srv://khanghoang12:khang12102003@cluster0.ojk0ors.mongodb.net/shop?retryWrites=true&w=majority")
        .then(client => {
            console.log("connected!!");
            _db = client.db();
            callback(client);
        })
        .catch(err => {
            console.log(err)
            throw err
        });

};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

