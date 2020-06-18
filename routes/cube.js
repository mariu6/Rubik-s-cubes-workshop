const env = process.env.NODE_ENV || 'development'; 

const express = require("express");
const router = new express.Router();
const Cube = require("../models/cube");
const { getAllCubes, getCube, updateCube, getCubeWithAccessories } = require("../controllers/cubes");
const jwt = require("jsonwebtoken");
const config = require("../config/config")[env];

router.get("/edit/", (req, res) => {
    res.render("editCubePage");
});

router.get("/delete", (req, res) => {
    res.render("deleteCubePage");
});


router.get("/details/:id", async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id);
    res.render("details", {
        title: "Details | Cube worshop",
        ...cube,
    })
})

router.get("/create", (req, res) => {
    res.render("create", {
        title: "Create | Cube worshop"
    })
})

router.post("/create", (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body;

    const token = req.cookies["aid"];                                  // To reference to the user as creator 
    const decodedObject = jwt.verify(token, config.privateKey);         
    const cube = new Cube({ name, description, imageUrl, difficulty: difficultyLevel, creatorId: decodedObject.userID });    // data must be in {}, as it is treated as object
    cube.save((err) => {            // model.save() method comes ready to se from mongoose 
        if (err) {
            console.error(err)
            res.redirect("/create");
        } else {
            res.redirect("/");
        }
    });
});

module.exports = router;