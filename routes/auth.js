const express = require("express");
const router = new express.Router();
const { saveUser, verifyUser, guestAccess, getUserStatus } = require("../controllers/user");

router.get("/login", guestAccess, getUserStatus, (req, res) => {
    res.render("loginPage", {              //02:14
    });
});

router.get("/signup", guestAccess, getUserStatus, (req, res) => {
    const error = req.query.error ? "Username or password is not valid" : null;
    res.render("registerPage", {
        error,
    });
});

router.post("/login", async (req, res) => {

    const { error } = await verifyUser(req, res)

    if (error) {
        return res.render("loginPage", {
            error: "Username or password is not correct",
        });
    }
    res.redirect("/");
})

router.post("/signup", async (req, res) => {
    const { password, repeatPassword } = req.body;
    if (password !== repeatPassword) {
        return res.render("registerPage", {
            error: "Passwords don't match!",
        });
    }
    if (!password || password.length < 8 || !password.match(/^[A-Za-z0-9 ]+$/) || password !== repeatPassword) {
        return res.render("registerPage", {
            error: "Username or password is not valid",
        });
    }
    const { error } = await saveUser(req, res);

    if (error) {
        return res.render("registerPage", {
            error: "Username or password is not valid",
        });
    }
    res.redirect("/");
})


// another hashing

module.exports = router;