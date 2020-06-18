require("dotenv").config();
const env = process.env.NODE_ENV || 'development';       // if not set, to switch to 'development' mode of enviroment

const mongoose = require("mongoose");
const config = require('./config/config')[env];        // add the configurations - 'development' or 'production'
// const configEnv = config[env]                            // settings of the values form config file - the property [env] which is set by me 
const indexRouter = require("./routes");                 // point to the router routes, no need to write index, as it will be default to search for
const authRouter = require("./routes/auth");
const cubeRouter = require("./routes/cube");
const accessoryRouter = require("./routes/accessory");
const app = require('express')();                        // use express and start it as app

mongoose.connect(config.databaseUrl, {
    useNewUrlParser: true,          
    useUnifiedTopology: true
}, (err) => {                       // connect to MongoDB Atlas. Link to DB is set in config file, password is set manually in process.env...
    if (err) {
        console.error("Mongoose error: ", err);
        throw err;
    }
    console.log("Database is setup and running");
})

require('./config/express')(app);                        // require settings for express, providing argument app
// require('./routes/index')();                    

app.use("/", authRouter);
app.use("/", accessoryRouter);
app.use("/", cubeRouter);
app.use("/", indexRouter);                       //  It would be good to separate and group the routes


app.get("*", (req, res) => {                 // It's last (after all app.use's)
    res.render("404", {
        title: "Error | Cube worshop"
    })
})

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`)); 