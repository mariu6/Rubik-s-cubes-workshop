const { Router } = require("express");
const { getAllCubes, getCube, updateCube, getCubeWithAccessories } = require("../controllers/cubes");
const { getAccessories } = require("../controllers/accessories");
const Accessory = require("../models/accessory");


// here we require the controllers and are going to call all the routes
// recomended - to have ROUTES folder to prevent a very big file here 

const router = Router();     // instead of app.get()... we are using router.get()

router.get("/", async (req, res) => {
    const { search, from, to } = req.query;
    // console.log(search, from, to);
    let cubes = await getAllCubes();

    // search
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

router.get("/details/:id", async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id);
    res.render("details", {
        title: "Details | Cube worshop",
        ...cube,
    })
})

router.get("/create/accessory", (req, res) => {
    res.render("createAccessory", {
        title: "Create accessory | Cube worshop"
    })
})

router.get("/attach/accessory/:id", async (req, res) => {
    const cube = await getCube(req.params.id);
    const accessories = await getAccessories();

    // hide already present for the cube ccessories
    const cubeAccessories = cube.accessories.map((acc) => acc._id.valueOf().toString()); // to take the value of the object (which again is object) and turn it to string
    const notAttachedAccessorries = accessories.filter((acc) => {
        const accessoryString = acc._id.valueOf().toString();
        return !cubeAccessories.includes(accessoryString);
    });
    // const notAttachedAccessorries = accessories.filter((acc) => !cube.accessories.toString().toString().includes(acc._id.toString().toString()));   // same thing on one row

    res.render("attachAccessory", {
        title: "Attach accessory | Cube worshop",
        ...cube,                                     //  this id is handled automatically by hanlebars
        accessories: notAttachedAccessorries,        // filter those accessories, which are not possesed by the cube
        isFullyAttached: cube.accessories.length === accessories.length     // 0===0 - no accessories, 3===3 - no more accessories
    })
})

router.post("/create/accessory", async (req, res) => {
    const { name, description, imageUrl } = req.body;
    const accessory = new Accessory({   // must be in {}
        name, description, imageUrl
    });
    await accessory.save((err) => {            // model.save() method comes ready to se from mongoose 
        if (err) console.error(err);
    })
    res.redirect("/create/accessory")
})

router.post("/attach/accessory/:id", async (req, res) => {
    const { accessory } = req.body;
    await updateCube(req.params.id, accessory);

    res.redirect(`/details/${req.params.id}`)
})

router.get("*", (req, res) => {
    res.render("404", {
        title: "Error | Cube worshop"
    })
})

module.exports = router;