const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const adminRoutes = require("./routes/admin")
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

const db = require("./util/database");

db.execute("select * from products").then().catch();

// app.set('view engine', "pug");
app.set('view engine', "ejs");
app.set("views", "views");


app.use(bodyParser.urlencoded({ extended: false }));
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(express.static(path.join(__dirname, 'public')));

app.use(errorController.get404);


app.listen(3000);

