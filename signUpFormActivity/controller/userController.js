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


// function setCookies(req, res){
//     // res.setHeader('Set-Cookie', 'isLoggedIn=true');
//     res.cookie('isLoggedIn', true, {maxAge: 1000*60*60*24, secure:true, httpOnly: true});
//     res.send('cookes has been set');
// }

// function getCookies(req,res)
// {
//     let cookies=req.cookies;
//     console.log(cookies);
//     res.send('cookies received');
// }

function protectRoute(req,res, next)
{
    if(req.cookies.isLoggedIn)
    {
        next();
    }
    else
    {
        return res.json({
            message: 'user Operation not allowed'
        })
    }
}