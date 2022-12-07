const express = require('express');
const Users = require('../modules/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const JWT = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const fetchUser = require('../middleware/fetchUser')
const JWT_Token = "#ItSjWtToken@Sign$"

//End Point : create user
router.post('/createuser', [
    body('name','Enter a valid Name.').isLength({ min: 3 }),
    body('email','Enter a valid E-mail.').isEmail(),
    body('password','Password must be of atleast 8 character.').isLength({ min: 8 }),
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    //check whether the user withs same email exists already??
    try {
        let user = await Users.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({success, error : "User with this email alreadty exists."})
        }
        const salt = await bcrypt.genSalt(10)
        secPass = await bcrypt.hash( req.body.password, salt)
        user = await Users.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        const data = {
            user : {
                id: user.id
            }
        }
        const authToken = JWT.sign(data,JWT_Token)
        success = true
        res.json({success,authToken})
    } catch (error) {
        success = false
        res.status(500).json({success, error : error.message})
    }
})

//End Point : Authenticate User 
router.post('/login', [
    body('email','Enter a valid E-mail.').isEmail(),
    body('password','Please Enter Password.').exists()
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body
    try {
        let user = await Users.findOne({email})
        if(!user){
            success = false
            return res.status(400).json({success, error: "Please Login-in with correct Credentials.."})
        }
        const comparePass = await bcrypt.compare(password, user.password)
        if(!comparePass){
            success = false
            return res.status(400).json({success, error: "Please Login with correct Credentials.."})
        }
        const data = {
            user:{
                id : user.id
            }
        }
        const authToken = JWT.sign(data,JWT_Token)
        success = true
        res.json({success,authToken})
    }catch (error) {
        //res.json({error : error.message}).status(500)
        success = false
        res.status(500).json({success, error: error.message})
        console.log(error.message)
    }
})
 
//Endpoint 3 : Get Logged-in user Info..
router.post('/getuser', fetchUser ,async (req, res) => {
    try {
        const success = true
        user_id = req.user.id
        const user_info = await Users.findById(user_id).select("-password")
        res.json({success, user_info})
    } catch (error) {
        success = false
        res.status(500).json({success, error : error.message})
    }
})

module.exports = router