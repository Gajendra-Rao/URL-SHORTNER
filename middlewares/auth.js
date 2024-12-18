const {getUser} = require("../service/auth")

function checkForAuthentication(req,res,next){
    const tokenCookie = req.cookies?.token;
    // console.log(req)
    req.user = null;
    if(!tokenCookie){
        return next();
    }
    const token = tokenCookie;
    const user = getUser(token);
    req.user = user;
    return next();
}
// The Above things do a soft check but the below thing restrict to only loggedin user
function restrictTO(role = []){
    return function(req,res,next){
        if(!req.user) return res.redirect("/login");
        
        if(!role.includes(req.user.role)) return res.end("Unauthorized");

        next();
    }
}
module.exports = {
    checkForAuthentication,
    restrictTO
}