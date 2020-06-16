const { Router } = require("express");
const { getAllCubes, getCube, updateCube, getCubeWithAccessories } = require("../controllers/cubes");
const { getAccessories } = require("../controllers/accessories");
const Accessory = require("../models/accessory");


// here we require the controllers and are going to call all the routes
// recomended - to have ROUTES folder to prevent a very big file here 

const router = Router();     // instead of app.get()... we are using router.get()

router.get("/", async (req, res) => {
    // console.log(search, from, to);
    let cubes = await getAllCubes();
    
    // search
    const { search, from, to } = req.query;
    cubes = cubes.filter((c => c.name.toLocaleLowerCase().includes((search || c.name).toLocaleLowerCase())));
    cubes = cubes.filter((c) => (c.difficulty >= (from || 1)) && (c.difficulty <= (to || 6)));

    res.render("index", {
        title: "Cube worshop",
        cubes    // for handlebars rendering
    })
})

router.get("/about", (req, res) => {
    res.render("about", {
        title: "About | Cube worshop"
    })
})

module.exports = router;