const {nanoid} = require("nanoid");
const URL = require("../model/url");
console.log(nanoid)

async function handleGenerateNewURL(req,res) {
    const shortID = nanoid(8);
    const body = req.body;
    if(!body.url){
        return res.status(400).json({ 
            "error" : "url is required"
        })
    }
    await URL.create({
        shortId : shortID ,
        redirectURL : body.url,
        visitHistory : [],
        createdBy : req.user._id,
    });
    return res.render('home',{
        id : shortID,
    })
}

async function getAnalysis(req,res) {
    const shortId = req.params.shortId;
    const result = URL.findOne({shortId : shortId})
    return res.json({
        totalClicks : result.visitHistory.length,
        analysis : result.visitHistory,
    })
}
module.exports = {
    handleGenerateNewURL,
    getAnalysis
}