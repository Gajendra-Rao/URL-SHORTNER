const express = require("express");
const router  = express.Router();
const URL = require("../model/url");
const { restrictTO } = require("../middlewares/auth");
router.get("/",restrictTO(["NORMAL","ADMIN"]),async (req,res)=>{
  if(!req.user) return res.redirect('/login')
    const allURL = await URL.find({
      createdBy : req.user._id,
    });
     return  res.render('home',{
      urls : allURL,
     })
  })
router.get("/admin/urls",restrictTO(['ADMIN']),
  async(req,res)=>{
    const allURL = await URL.find({})
    return res.render('home',{
      urls : allURL,
    })
  }
)
router.get("/signup",(req,res)=>{
  return res.render("signUp");
})
router.get("/login",(req,res)=>{
  return res.render("login");
})
module.exports = router