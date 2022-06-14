const express = require("express");
const { min } = require("lodash");
const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const app = express();

app.use(express.json());
app.listen(5000);

// let users= [
//     {
//       id: 1,
//       name: "Rohan",
//     },
//     {
//       id: 2,
//       name: "Vishakha",
//     },
//     {
//       id: 3,
//       name: "Shreya",
//     },
//     {
//       id: 4,
//       name: "Sakshi",
//     },
//   ];

  
//mini app
const userRouter = express.Router();
const authRouter = express.Router();

// base route , router to use
app.use("/user", userRouter);
app.use("/auth", authRouter);

userRouter
.route("/")
.get(getUsers)
.post(postUser)
.patch(updateUser)
.delete(deleteUser);

userRouter.route("/:id").get(getUserById);

authRouter
.route("/signup")
.get(getSignUp)
.post(postSignUp);

async function getUsers(req,res)
{
    // res.send(users);
    let allUsers = await userModel.find();

    res.json({message: "list of all users",
    data: allUsers});
}

function postUser(req,res)
{
    console.log(req.body);
    users=req.body;

    res.json({
        message:"data received successfully",
        user: req.body
    })
}

async function deleteUser(req,res)
{
    // users={};
    let dataToBeDelete=req.body;
    let user = await userModel.findOneAndDelete(dataToBeDelete);
    res.json({
        message: "data has been deleted",
        data: user
    })
}

async function updateUser(req,res)
{
    console.log("req.body->", req.body);
    let dataToBeUpdated=req.body;
    let user = await userModel.findOneAndUpdate({email:'abc@gmail.com'}, dataToBeUpdated);

    // for(key in dataToBeUpdated)
    // {
    //     users[key]=dataToBeUpdated[key];
    // }

    res.json({
        message: "data updated successfully"
    })
}

function getUserById(req,res)
{
    console.log(req.params.id);
    let paramId = req.params.id;
    let obj={};
    for(let i=0; i<users.length; i++)
    {
        if(users[i]['id']==paramId)
        {
            obj=users[i];
        }
    }
    res.json({
        message:"req received",
        data: obj
    })
}

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

const db_link='mongodb+srv://admin:v7owLvq06TEtGTaD@cluster0.bvg1dkr.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    console.log(db);
    console.log('db connected');
}).catch(function(err){
    console.log(err);
})

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    }, 
    email:{
        type: String,
        required: true,
        unique: true,
        validate: function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type: String,
        required: true,
        minLength:10
    },
    consfirmPassword:{
        type:String,
        required: true,
        minLength:10,
        validate:function(){
            return this.consfirmPassword == this.password;
        }
    }

});

userSchema.pre("save", function(){
    console.log('before saving in db');
});

userSchema.post("save", function(doc){
    console.log('after saving in db', doc);
});

userSchema.pre('save', function(){
    this.consfirmPassword=undefined;
})

const userModel=mongoose.model('userModel', userSchema);

// (async function createUser()
// {
//     let user={
//         name: "bhatia", 
//         email: "abc1@.com", 
//         password: "123456789",
//         consfirmPassword: "123456789"
//     };
//     let data = await userModel.create(user);
//     console.log(data);
// })();