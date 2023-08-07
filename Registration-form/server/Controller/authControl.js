const User = require("../models/user");
const { comparePassword, hashPassword } = require("../helper/auth");
const jwt = require('jsonwebtoken');

const test = function (req, res) {
    res.json("test is working");
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name) {
            return res.json({
                error: "Please enter a valid Name",
            });
        }

        if (!password || password.length < 6) {
            return res.json({
                error: "Enter a password of 6 characters or more",
            });
        }

        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({
                error: "Email already taken",
            });
        }

        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // return res.json(user);

         // Send a success response with the user object
         return res.json({
            success: true,
            user,
        });
    } catch (error) {
        console.log(error);
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: "No user found",
            });
        }

        // check if password matches
        const match = await comparePassword(password, user.password);
        if (match) {
            // return res.json({
            //     message: "Password matches",
            // });
            jwt.sign({email: user.email,id : user._id ,name: user.name}, process.env.JWT_SECRET , {} , (err,token) => {
                if(err) throw err;
                res.cookie('token',token).json(user)
            })
        } else {
            return res.json({
                error: "Passwords do not match",
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const getProfile = (req,res) => {
 const {token} = req.cookies
 if(token) {
    jwt.verify(token,process.env.JWT_secret,{},(err ,user) => {
        if(err) throw err;
        res.json(user)
    })
 }
 else{
    res.json(null)
 }}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
};
