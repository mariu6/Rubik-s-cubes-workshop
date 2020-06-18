module.exports = {
    development: {
        port: process.env.PORT || 4400,
        privateKey: "CUBE-WORKSHOP-SOFTUNI",     // for jwt
        databaseUrl: `mongodb+srv://user:${process.env.DB_PASSWORD}@softuni-hkggx.mongodb.net/cublicle?retryWrites=true&w=majority`
    },
    production: {
        databaseUrl: "https://mlab.com/test",
        // databaseUrl:process.env.DATABASE,       
        // To protect our user/pass. We set the database in this DATABASE property with user/pass  like for example:
        // set DATABASE="https://<username>:<password>@mlab.com/test"
    }
};