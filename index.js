const express = require("express");
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require("./routes/db-config");
const app = express();
const path = require('path');
const mysql = require("mysql"); 
const cors = require("cors");
const authRoutes = require('./controllers/auth');
const cookie = require("cookie-parser");
const postRoutes = require("./routes/postRoutes");
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 3001;
app.use("/js",express.static(__dirname + "/js"))
app.use("/css",express.static(__dirname + "/css"))
app.use("/img",express.static(__dirname + "/img"))
app.set("view engine", "ejs"); 
app.set("views", "./views");
app.use(authRoutes);
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookie());
app.use(cors());
app.use(bodyParser.json());//

app.use(express.json());
db.connect((err) => {
    if(err) throw err;
    console.log("database connected");
})

// const products = [
//     { id: 1, name: 'Product 1', price: 10 },
//     { id: 2, name: 'Product 2', price: 20 },
//     { id: 3, name: 'Product 3', price: 30 },
// ];

app.use("/", require("./routes/pages"));
app.use("/api", require("./controllers/auth"));
app.use('/post', postRoutes);

app.use(express.urlencoded({ extended: true}));
app.listen(PORT);
