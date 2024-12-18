const user = require("../model/user");
const{v4 : uuidv4} = require("uuid");
const {setUser,getUSer} = require("../service/auth")
async function handleSignUp(req,res) {
    const {name, email, password} = req.body;
    await user.create({
        name,
        email,
        password,
    })
    return res.redirect("/")
}

async function handleLogIn(req,res){
    console.log("Login route hit");
    const {email,password} = req.body;
    console.log("Received data:", { email, password });
    const User = await user.findOne({email, password})
    if(!User){ 
        return res.render("login", {
            error : "Invalid Username or Password",
        });
    }
    const token = setUser(User);
    res.cookie("token",token);
    // return res.json({token})
    return res.redirect("/");
}
module.exports = { 
    handleSignUp,
    handleLogIn
}