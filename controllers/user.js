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

const verifyUser = async (req, res) => {
    const {
        username,
        password,
    } = req.body;
    
    // get user by username
    const user = await User.findOne({username})   // returns { _id, username, hashedPassword }
    
    const status = await bcrypt.compare(password, user.password);     // password comparsoin => true || false
    if (status) {
        const token = generateToken({
            userID: user._id,           // will be referensed for Cube creator
            username: user.username,    // pass shoudn't be shown here
        });
        
        res.cookie("aid", token);
    }
    
    return status;
}

module.exports = {
    saveUser,
    verifyUser
}