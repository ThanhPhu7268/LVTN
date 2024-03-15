import express from "express";

let configViewEngine = (app) => {
    //arrow
    app.use(express.static("./src/public"))
    // app.set('view engine', "ejs")
    // app.set('view', "./src/views")
}

module.exports = configViewEngine;