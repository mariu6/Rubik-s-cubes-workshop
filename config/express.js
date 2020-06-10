const express = require('express');
const handlebars = require('express-handlebars');
// const bodyParser = require('body-parser');        // not needed, as it became part of express

// here is the full SETUP OF EXPRESS for view engine, static files etc
module.exports = (app) => {
    //TODO: SETUP THE VIEW ENGINE - HANDLEBARS
    app.engine('.hbs', handlebars({
        extname: ".hbs"
    }));
    app.set('view engine', '.hbs');

    //TODO: Setup the body parser 
    // app.use(express.json())      // might be needed when sending data with jquery or ajax requests
    app.use(express.urlencoded({ extended: true }))  // to be able to get data with req.body

    //TODO: Setup the static files in express.
    app.use("/static", express.static("static"));    //  "/static" - THIS FOLDER BECOMS VISIBLE TO PUBLIC 
    // to change href in the main.hbs file as well: <link href="/static/css/site.css" type="text/css" rel="stylesheet">
}; 