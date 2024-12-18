const jwt = require("jsonwebtoken")
const secret = 'Gajendra'
function setUser(user){
    return jwt.sign({
        _id : user._id,
        email : user.email,
        role: user.role,

    },secret)
    //assigning user object as a payload
}

function getUser(token){
    try {
        return jwt.verify(token,secret);
    } catch (error) {
        console.log(error)
       return null 
    }
}

module.exports = {
    setUser,
    getUser
}