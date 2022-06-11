const express = require("express");

const app = express();

app.use(express.json());
app.listen(5000);

let users= [
    {
      id: 1,
      name: "Rohan",
    },
    {
      id: 2,
      name: "Vishakha",
    },
    {
      id: 3,
      name: "Shreya",
    },
    {
      id: 4,
      name: "Sakshi",
    },
  ];

  
//mini app
const userRouter = express.Router();
const authRouter = express.Router();

// base route , router to use
app.use("/user", userRouter);
app.use("/auth", authRouter);

userRouter
.route("/")
.get(getUser)
.post(postUser)
.patch(updateUser)
.delete(deleteUser);

userRouter.route("/:id").get(getUserById);

authRouter
.route("/signup")
.get(getSignUp)
.post(postSignUp);

function getUser(req,res)
{
    res.send(users);
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

function deleteUser(req,res)
{
    users={};
    res.json({
        message: "data has been deleted"
    })
}

function updateUser(req,res)
{
    console.log("req.body->", req.body);
    let dataToBeUpdated=req.body;
    for(key in dataToBeUpdated)
    {
        users[key]=dataToBeUpdated[key];
    }

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

function postSignUp(req,res)
{
    let obj=req.body;
    console.log("backend->", obj);
    res.json({
        message: "user signed up",
        data:obj
    });
}