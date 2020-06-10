// TODO: Require Controllers...
const { Router } = require("express");
const { getCubes, getCube } = require("../controllers/database");
const Cube = require("../models/cubeModel");


// here we require the controllers and are going to call all the routes
// recomended - to have ROUTES folder to prevent a very big file here 

const router = Router();     // instead of app.get()... we are using router.get()

router.get("/", (req, res) => {   // by default handlebars will search for /layouts/main.hbs
    // getAllCubes((cubes) => {
    //     res.render("index", {           // renders index.hbs with the template data
    //         title: "Cube worshop",      // tab title
    //         cubes          // syncronous read of the database.json file. Then handlebars will process #each element of the array and it's properties      
    //     })
    // })
    const { search, from, to } = req.query;
    // console.log(search, from, to);
    getCubes((cubes) => {
        cubes = cubes.filter((c => c.name.toLocaleLowerCase().includes((search || c.name).toLocaleLowerCase())));
        cubes = cubes.filter((c) => (c.difficulty >= (from || 1)) && (c.difficulty <= (to || 6)));
        res.render("index", {           // renders index.hbs with the template data
            title: "Cube worshop",      // tab title
            cubes          // syncronous read of the database.json file. Then handlebars will process #each element of the array and it's properties      
        })
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
    } = req.body
    const cube = new Cube(name, description, imageUrl, difficultyLevel);
    cube.save(() => {
        res.redirect("/");
    });
})

router.get("/details/:id", (req, res) => {
    getCube(req.params.id, (cube) => {
        res.render("details", {
            title: "Details | Cube worshop",
            ...cube
        })
    })
})

router.get("*", (req, res) => {
    res.render("404", {
        title: "Error | Cube worshop"
    })
})


module.exports = router;