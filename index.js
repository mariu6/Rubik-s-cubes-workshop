const env = process.env.NODE_ENV || 'development';       // if not set, to switch to 'development' mode of enviroment

const config = require('./config/config')//[env];        // add the configurations - 'development' or 'production'
const configEnv = config[env]                            // settings of the values form config file - the property [env] which is set by me 
const app = require('express')();                        // use express and start it as app
const indexRouter = require("./routes");                 // point to the router routes, no need to write index, as it will be default to search for
require('./config/express')(app);                        // require settings for express, providing argument app
// require('./routes/index')();                    




app.use("/", indexRouter)                       //  

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));