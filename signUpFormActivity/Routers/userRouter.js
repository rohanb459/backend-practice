const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = express.Router();
const userModel=require("../models/userModel");
const cookieParser=require("cookie-parser");
const {getUsers, getUserById, updateUser, deleteUser, postUser}=require('../controller/userController');
app.use(cookieParser());

userRouter
.route("/")
.get(protectRoute, getUsers)
.post(postUser)
.patch(updateUser)
.delete(deleteUser);


userRouter
.route("/getCookies")
.get(getCookies);


userRouter
.route("/setCookies")
.get(setCookies);


userRouter.route("/:id").get(getUserById);

module.exports=userRouter;