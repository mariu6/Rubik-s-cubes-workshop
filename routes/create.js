const { Router } = require("express");
const Cube = require("../models/cube");
const router = Router();     

router.get("/", (req, res) => {
    res.render("create", {
        title: "Create | Cube worshop"
    })
})

router.post("/", (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body;
    const cube = new Cube({ name, description, imageUrl, difficulty: difficultyLevel });    // data must be in {}, as it is treated as object
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