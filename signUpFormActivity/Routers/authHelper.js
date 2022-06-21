// let flag = false // user logged in or not
const jwt = require('jsonwebtoken');
const jwt_Key= 'sf24ionvjr35sfoigj78afia4o';

function protectRoute(req, res, next)
{
    if(req.cookies.login)
    {
        let isVerified = jwt.verify(jwt, jwt_Key);
        next();
    }
    else{
        return res.json({
            message: 'Operation not allowed'
        });
    }
}