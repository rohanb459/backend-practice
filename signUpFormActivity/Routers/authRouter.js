const express = require("express");
const userModel=require("../models/userModel");
const mongoose = require("mongoose");
const authRouter = express.Router();
const jwt_Key = 'sf24ionvjr35sfoigj78afia4o';
const jwt = require('jsonwebtoken');

authRouter
.route("/signup")
.get(getSignUp)
.post(postSignUp);

authRouter
.route("/login")
.post(loginUser);


function getSignUp(req,res)
{
    // res.sendFile('C:\Users\hp\OneDrive\Desktop\BackEnd Dev\signUpFormActivity\public\signupForm.html');
    res.sendFile('/public/index.html', {root: __dirname});
}

async function postSignUp(req,res)
{
    let dataObj=req.body;
    // console.log("backend->", obj);
    let user=await userModel.create(dataObj);
    console.log('backend', user);
    res.json({
        message: "user signed up",
        data: user
    });
}

async function loginUser(req, res)
{
    try{
        let data=req.body;
        let user=await userModel.findOne({email:data.email});

        if(user)
        {   // bcrypt -> compare
            if(user.password==data.password){
                let uid=user['_id'];
                let jwt = jwt.sign({payload: uid}, jwt_Key);
                res.cookie('isLoggedIn', token, {httpOnly: true});
                return res.json({
                message: "User has Logged in",
                userDetails: data
            })
        }
        }
        else{
            return res.status(500).json({
               message: "Wrong credentials!"
            });
        }

    }catch(err)
    {
        return res.json({
            message: err.message
        })
    }
}

module.exports=authRouter;