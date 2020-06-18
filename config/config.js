module.exports = {
    development: {
        port: process.env.PORT,
        privateKey: process.env.PRIVATE_KEY,     // for jwt
        databaseUrl: process.env.DATABASE_URL
    },
    production: {
        databaseUrl: "https://mlab.com/test",
        // databaseUrl:process.env.DATABASE,       
        // To protect our user/pass. We set the database in this DATABASE property with user/pass  like for example:
        // set DATABASE="https://<username>:<password>@mlab.com/test"
    }
};