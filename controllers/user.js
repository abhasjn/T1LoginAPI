// Creating SignUp Controller
const User = require("../models/user.js")

// Import Validation
const { validationResult } = require("express-validator")

var jwt = require('jsonwebtoken')
var ExpressJwt = require('express-jwt')

exports.signup = (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }
    const user = new User(req.body) //Getting the data passed by the user.
    user.save((err, user) => {
        // Running the function inside save
        if (err) {
            return res.status(4000).json({
                error: "Unable to add user"
            })
        }
        return res.json({
            message: "Success",
            user
        })
    })
}


exports.signin = (req, res) => {
    const {email, password} = req.body
  
    User.findOne({email}, (err, user) => {   // find by email
      if(err || !user) {
        return res.status(400).json({
          error: "Email was not found"
        })
      }
  
      // Authenticate user
      if(!user.authenticate(password)) {
        return res.status(400).json({
          error: "Email and password do not match"
        })
      }
  
      // Create token
      const token = jwt.sign({_id: user._id}, process.env.SECRET)   // _id is generated.
  
      // Put token in cookie
      res.cookie('token', token, {expire: new Date() + 1})  // Token will expire after 1 day.
  
      // Send response
      const {_id, name, email} = user
      return res.json({
        token,
        user: {
          _id,
          name,
          email
        }
      })
      
    })
  }


exports.signout = (req, res) =>{
    res.clearCookie('token')
    return res.json({
        message: "User Signout Successful"
    })
}