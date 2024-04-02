require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')

const connectDatabase = require("../config/db.config")
const router = require("../app/controller")

connectDatabase().then(() => {
    console.log("Suceess");
})

const app  = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use("/api", router);

module.exports = app;