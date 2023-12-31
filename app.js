const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

const adminRoutes = require("./routes/admin")
const shopRoutes = require("./routes/shop");

const errorController = require("./controllers/error");
const mongodbConnect = require("./util/database").mongoConnect;
const User = require("./models/user");
// const sequelize = require("./util/database");
// const Product = require("./models/product");
// const User = require("./models/user");
// const Cart = require("./models/cart");
// const CartItem = require("./models/cart-item");
// const Order = require("./models/order");
// const OrderItem = require("./models/order-item");

// app.set('view engine', "pug");
app.set('view engine', "ejs");
app.set("views", "views");


app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById("654266e69c6ead4d348bfd0f")
        .then(user => {
            req.user = new User(user.username, user.email, user.cart, user._id);
            next();
        })
        .catch(error => console.log(error));

});
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongodbConnect(() => {
    app.listen(3000);
});

// Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });


// sequelize
//     .sync()
//     .then(result => {
//         return User.findByPk(1);
//     })
//     .then(user => {
//         if (!user) {
//             return User.create({ name: "Khang", email: "test@gmail.com" });
//         }
//         return user;
//     })
//     .then(user => {
//         //console.log(user);
//         return user.createCart();

//     })
//     .then(cart => {
//         app.listen(3000);
//     })
//     .catch(err => console.log(err));


