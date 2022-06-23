const express = require("express");
const userRouter = express.Router();
const protectRoute = require('./authHelper');
const { getUser, getAllUser, updateUser, deleteUser } = require("../signUpFormActivity/controller/userController");
const { application } = require("express");

//user ke options
userRouter.route('/:id')
.patch(updateUser)
.delete(deleteUser)

// profile page
app.use(protectRoute)
userRouter
.route('/userProfile')
.get(getUser)

// admin specific func
app.use(isAuthorized(['admin']));
userRouter.route('')
.get(getAllUser)


moduole.exports=userRouter;