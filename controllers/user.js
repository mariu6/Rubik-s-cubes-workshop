const env = process.env.NODE_ENV || 'development';

const jwt = require("jsonwebtoken");
const User = require("../models/user");  // import the Model
const bcrypt = require("bcrypt");
const config = require("../config/config")[env];

const generateToken = (data) => {
    const token = jwt.sign(data, config.privateKey);
    return token;
}

const saveUser = async (req, res) => {
    const {
        username,
        password,
    } = req.body;

    //  hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const user = new User({
            username,
            password: hashedPassword,
        });
        const userObject = await user.save();     // returns { _id, username, hashPassword }

        const token = generateToken({
            userID: userObject._id,
            username: userObject.username,    // pass shoudn't be shown here
        });

        res.cookie("aid", token);
        return token;
    } catch (err) {
        return {
            error: true,
            message: err,
        }
    }


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

const verifyUser = async (req, res) => {
    const {
        username,
        password,
    } = req.body;

    // get user by username
    try {
        const user = await User.findOne({ username })   // returns { _id, username, hashedPassword }
        if (!user) {
            return {
                error: true,
                message: "There is no such user!"
            };
        }
        const status = await bcrypt.compare(password, user.password);     // password comparsoin => true || false
        if (status) {
            const token = generateToken({
                userID: user._id,           // will be referensed for Cube creator
                username: user.username,    // pass shoudn't be shown here
            });

            res.cookie("aid", token);
        }

        return {
            error: !status, 
            message: status || "Wrong password"
        };
    } catch(err) {
        return {
            error: true,
            message: "There is no such user!",
            status
        };
    }
}

const authAccess = (req, res, next) => {    // to set USER available pages
    const token = req.cookies["aid"];
    if (!token) {
        return res.redirect("/");
    }

    try {
        const decodedObject = jwt.verify(token, config.privateKey);    // if token not correct or malformed
        next();
    } catch (e) {
        return res.redirect("/");
    }
}
const authAccessJSON = (req, res, next) => {    // to set USER available pages
    const token = req.cookies["aid"];
    if (!token) {
        return res.json({
            error: "Not authenticated"
        });
    }

    try {
        const decodedObject = jwt.verify(token, config.privateKey);    // if token not correct or malformed
        next();
    } catch (e) {
        return res.json({
            error: "Not authenticated"
        });
    }
}

const guestAccess = (req, res, next) => {    // to set GUEST available pages
    const token = req.cookies["aid"];
    if (token) {
        return res.redirect("/");
    }
    next();
}

const getUserStatus = (req, res, next) => {
    const token = req.cookies["aid"];
    if (!token) {
        req.isLoggedIn = false;
    }

    try {
        jwt.verify(token, config.privateKey);    // if token not correct or malformed
        req.isLoggedIn = true;
    } catch (e) {
        req.isLoggedIn = false;
    }
    next();
}

module.exports = {
    saveUser,
    verifyUser,
    authAccess,
    guestAccess,
    getUserStatus,
    authAccessJSON,
}