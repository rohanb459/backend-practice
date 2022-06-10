const express = require("express");

const app = express();
app.use(express.json());//middleware func-> post, front->json
app.listen(3000); 

let users={};

app.get('/users', (req,res)=>{
    res.send(users);
})

app.post('/users',(req,res)=>{
    console.log(req.body);
    users=req.body;
    res.json({
        message: "data received successfully",
        user: req.body
    })
}); 


// update -> patch
app.patch('/users', (req,res)=>{
    console.log('req body ->', req.body);
    // update data in users obj
    let dataToBeUpdated=req.body;
    for(key in dataToBeUpdated)
    {
        users[key]=dataToBeUpdated[key];
    }
    res.json({
        message: "data updated successfully"
    });
})

// delete

app.delete('/users', (req,res)=>{
    users={};
    res.json({
        message: "data has been deleted"
    });
});