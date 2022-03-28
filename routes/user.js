// Importing the modules
const express = require("express")
const { signup , signin , signout} = require("../controllers/user")
const {check, validationResult} = require("express-validator")

// Initialising
const router = express.Router()

// Route for Signup with Validation
router.post('/signup',[
    check("name", "Name should be atleast 3 characters.").isLength({min: 3}),
    check("email", "Email should be valid").isEmail(),
    check("password","Password should be atleast 6 characters.").isLength({min: 6})
]  ,signup)
// It is going to check in sequence and even if one runs, the others don't.

router.post('/signin', signin)

router.get("/signout", signout)

module.exports= router
