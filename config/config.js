module.exports = {
    development: {
        port: process.env.PORT || 4400,
        databaseUrl:"mongodb://localhost:27017/test"
    },
    production: {  
        databaseUrl:"https://mlab.com/test",
        // databaseUrl:process.env.DATABASE,       
        // To protect our user/pass. We set the database in this DATABASE property with user/pass  like for example:
        // set DATABASE="https://<username>:<password>@mlab.com/test"
    }
};