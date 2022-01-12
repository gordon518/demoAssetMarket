const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const router = require("./router");
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'react sec',
    resave: false,
    saveUninitialized: true
}));


app.use("/api", router);

app.use("/",express.static(__dirname+"/dist"));
//app.get("/", (req, res) => {
//    return res.render("index", {
//        userName: "",
//        token: "",
//        hasLogin: false
//    })
//})

//mongoose.connect("mongodb://localhost/db", (err, db) => {
//    if(err) {
//        console.log("MongoDb coonnect error");
//        process.exit(1);
//    }
//    else {
//        console.log("MongoDb connect succeeded")
//    }
//})

app.listen("8888", () => {
    console.log("server created at port:8888!");
})