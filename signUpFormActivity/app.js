const express = require("express");
const { min } = require("lodash");
const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const userModel=require("./models/userModel");
const bcrypt = require("bcrypt");
const cookieParser=require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.listen(5000);


  
//mini app
const userRouter = require('./Routers/userRouter');
const authRouter = require('./Routers/authRouter');

// base route , router to use
app.use("/user", userRouter);
app.use("/auth", authRouter);
