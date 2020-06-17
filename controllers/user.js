const jwt = require("jsonwebtoken");
const User = require("../models/user");  // import the Model
const bcrypt = require("bcrypt");

const privateKey = "CUBE-WORKSHOP-SOFTUNI";

const saveUser = async (req, res) => {
    const {
        username,
        password,
    } = req.body;

    //  hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
        username,
        password: hashedPassword,
    });

    const userObject = await user.save();     // returns { _id, username, hashPassword }

    const token = jwt.sign({
        userID: userObject._id,
        username: userObject.username,    // pass shoudn't be shown here
    }, privateKey);

    res.cookie("aid", token);

    return true;


    // another hashing
    // bcrypt.hash(password, 10, async function (err, hashedPassword) {
    //     // Store hash in your password DB.
    //     const user = new User({
    //         username,
    //         password: hashedPassword,
    //     });

    //     await user.save();
    //     res.redirect("/");
    // });
}

module.exports = {
    saveUser,
}