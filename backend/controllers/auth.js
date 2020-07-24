var User = require("../models/user")
var {validate,validationResult} = require("express-validator")
var expressjwt = require("express-jwt")
var jwt = require("jsonwebtoken")


exports.signout = (req,res) => {
    res.clearCookie("token")
    res.json({
        message:"signout successful"
    })
}

exports.signup = (req,res) => {
    const err = validationResult(req);
    if(!err.isEmpty()){
        return res.status(422).json({
            error:err.array()[0].msg
        })
    }
    const user = new User(req.body)
    user.save((err,user) => {
        if(err){
            return res.status(400).json({
                error:"signup failed"
            })
        }
        res.json(user)
    })
}

exports.login = (req,res) => {
    const errors = validationResult(req)
    const {email,password} = req.body
    const user = new User(req.body)

    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    User.findOne({email},(err,user) => {

        if(err || !user){
            return res.status(400).json({
                error:"invalid email id"
            })
        }
        if(!user.auth_password(password)){
            return res.status(401).json({
                error:"Wrong password"
            })
        }

        //creating tokens
        const token = jwt.sign({_id:user._id},process.env.SECRET_KEY)
        //put token in cookie
        res.cookie("token",token,{expire:new Date()+9999})

        //sending reponse
        const {_id,name,email,role}=user
        return res.json({token,user:{_id,name,email,role}})
    })

}

//Protected Route
exports.isSignedIn = expressjwt({
    secret:process.env.SECRET_KEY,
    userProperty:"auth",
    algorithms:["HS256"]
})
//MiddleWares
exports.isAuthenticated = (req,res,next) => {
    let validate = req.profile && req.auth && req.profile._id == req.auth._id
    //console.log(req.profile);
    if(!validate){
        return res.status(400).json({
            error:"Authentication failed"
        })
    }
    next()
}

exports.isAdmin = (req,res,next) => {
    if(req.profile.role !== 1){
        return res.status(400).json({
            error:"Not an Admin"
        })
    }
    next()
}