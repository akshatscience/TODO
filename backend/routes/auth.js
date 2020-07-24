var express = require("express")
var router = express.Router()

const {check} = require("express-validator")

const {signup,signout,login} = require("../controllers/auth")

router.get("/signout",signout)

router.post("/signup",[
    check("name").isLength({min:3}).withMessage("name should be 3 characters long"),
    check("email").isEmail().withMessage("Invalid Email"),
    check("password").isLength({min:5}).withMessage("password should be 5 characters long")
    .matches(/\d/).withMessage("must contain a number")],
    signup)

router.post("/login",[
    check('email').isEmail().withMessage("Invalid Email"),
    check('password').isLength({min:5}).withMessage("Invalid Password")
],login)


module.exports = router

