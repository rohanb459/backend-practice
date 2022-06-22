// let flag = false // user logged in or not
const jwt = require('jsonwebtoken');
const jwt_Key= 'sf24ionvjr35sfoigj78afia4o';

function protectRoute(req, res, next)
{
    if(req.cookies.login)
    {
        console.log(req.cookies);
        let isVerified = jwt.verify(req.cookies.login, jwt_Key);
        if(isVerified)
        {
            next();
        }
        else{
            return res.json({
                message: 'user not verified'
            })
        }
    }
    else{
        return res.json({
            message: 'Operation not allowed'
        });
    }
}

module.exports=protectRoute;