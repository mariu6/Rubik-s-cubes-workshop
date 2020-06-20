const env = process.env.NODE_ENV || 'development';

const express = require("express");
const router = new express.Router();
const Cube = require("../models/cube");
const { getAllCubes, getCube, updateCube, getCubeWithAccessories } = require("../controllers/cubes");
const jwt = require("jsonwebtoken");
const config = require("../config/config")[env];
const { authAccess, getUserStatus, authAccessJSON } = require("../controllers/user");

router.get("/edit/", authAccess, getUserStatus, (req, res) => {
    res.render("editCubePage", {
        isLoggedIn: req.isLoggedIn,
    });
});

router.get("/delete", authAccess, getUserStatus, (req, res) => {
    res.render("deleteCubePage", {
        isLoggedIn: req.isLoggedIn,
    });
});


router.get("/details/:id", getUserStatus, async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id);
    res.render("details", {
        title: "Details | Cube worshop",
        ...cube,
        isLoggedIn: req.isLoggedIn,
    })
})

router.get("/create", authAccess, getUserStatus, (req, res) => {
    res.render("create", {
        title: "Create | Cube worshop",
        isLoggedIn: req.isLoggedIn,
    })
})

router.post("/create", authAccess, async (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body;

    const token = req.cookies["aid"];                                   // To reference to the user as creator 
    const decodedObject = jwt.verify(token, config.privateKey);
    const cube = new Cube({                                             // data must be in {}, as it is treated as object
        name: name.trim(),
        description: description.trim(),
        imageUrl,
        difficulty: difficultyLevel,
        creatorId: decodedObject.userID
    });

    try {
        await cube.save();
        return res.redirect("/");
    } catch (err) {
        res.render("create", {
            title: "Create | Cube worshop",
            isLoggedIn: req.isLoggedIn,
            error: "Cube details are not valid",
        })
    }
});

module.exports = router;