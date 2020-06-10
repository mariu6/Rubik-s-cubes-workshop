const { Router } = require("express");
const { getAllCubes, getCube } = require("../controllers/cubes")
const { getCubes } = require("../controllers/database");
const Cube = require("../models/cube");


// here we require the controllers and are going to call all the routes
// recomended - to have ROUTES folder to prevent a very big file here 

const router = Router();     // instead of app.get()... we are using router.get()

router.get("/", async (req, res) => {
    const { search, from, to } = req.query;
    // console.log(search, from, to);
    const cubes = await getAllCubes();
    getCubes((cubes) => {
        cubes = cubes.filter((c => c.name.toLocaleLowerCase().includes((search || c.name).toLocaleLowerCase())));
        cubes = cubes.filter((c) => (c.difficulty >= (from || 1)) && (c.difficulty <= (to || 6)));

    })
    res.render("index", {
        title: "Cube worshop",
        cubes
    })
})

router.get("/about", (req, res) => {
    res.render("about", {
        title: "About | Cube worshop"
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
    const cube = new Cube({ name, description, imageUrl, difficulty: difficultyLevel });
    cube.save((err) => {            // model.save() method comes ready to se from mongoose 
        if (err) {
            console.error(err)
        } else {
            res.redirect("/");
        }
    });
})

router.get("/details/:id", async (req, res) => {
    const cube = await getCube(req.params.id)

    res.render("details", {
        title: "Details | Cube worshop",
        ...cube
    })
})

router.get("*", (req, res) => {
    res.render("404", {
        title: "Error | Cube worshop"
    })
})


module.exports = router;