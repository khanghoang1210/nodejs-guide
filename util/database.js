const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-app", "root", "12102003", {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;