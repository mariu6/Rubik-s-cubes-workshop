const { Router } = require("express");
const { getAllCubes } = require("../controllers/cubes");
const {getUserStatus} = require("../controllers/user");
// const fetch = require("node-fetch");

// here we require the controllers and are going to call all the routes
// recomended - to have ROUTES folder to prevent a very big file here 

const router = Router();     // instead of app.get()... we are using router.get()

router.get("/",getUserStatus, async (req, res) => {
    // console.log(search, from, to);
    let cubes = await getAllCubes();
    
    // fetch("http://localhost:4000/api/cube/all")
    // .then(res => res.json())
    // .then(body => console.log(body));

    // search
    const { search, from, to } = req.query;
    cubes = cubes.filter((c => c.name.toLocaleLowerCase().includes((search || c.name).toLocaleLowerCase())));
    cubes = cubes.filter((c) => (c.difficulty >= (from || 1)) && (c.difficulty <= (to || 6)));

    res.render("index", {
        title: "Cube worshop",
        cubes,    // for handlebars rendering
        isLoggedIn: req.isLoggedIn,
    })
})

router.get("/logout",  getUserStatus, (req, res) => {
    res.clearCookie("aid");
    res.redirect("/");
})

router.get("/about",  getUserStatus, (req, res) => {
    res.render("about", {
        title: "About | Cube worshop",
        isLoggedIn: req.isLoggedIn,
    })
})

module.exports = router;