const express = require("express");
const router = new express.Router();
const { authAccess, getUserStatus, authAccessJSON } = require("../controllers/user");
const { getCube, updateCube } = require("../controllers/cubes");
const { getAccessories } = require("../controllers/accessories");
const Accessory = require("../models/accessory");


router.get("/create/accessory", authAccess, getUserStatus, (req, res) => {
    res.render("createAccessory", {
        title: "Create accessory | Cube worshop",
        isLoggedIn: req.isLoggedIn,
    })
})

router.get("/attach/accessory/:id", authAccess, getUserStatus, async (req, res) => {
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
        isFullyAttached: cube.accessories.length === accessories.length,     // 0===0 - no accessories, 3===3 - no more accessories
        isLoggedIn: req.isLoggedIn,
    })
})

router.post("/create/accessory", authAccess, async (req, res) => {
    const { name, description, imageUrl } = req.body;
    const accessory = new Accessory({   // must be in {}
        name, description, imageUrl
    });
    await accessory.save((err) => {            // model.save() method comes ready to se from mongoose 
        if (err) console.error(err);
    })
    res.redirect("/create/accessory")
})

router.post("/attach/accessory/:id", authAccess, async (req, res) => {
    const { accessory } = req.body;
    await updateCube(req.params.id, accessory);

    res.redirect(`/details/${req.params.id}`)
})

module.exports = router;