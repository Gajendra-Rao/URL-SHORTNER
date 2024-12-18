const express = require("express")
const router  = express.Router();
const {handleGenerateNewURL,getAnalysis} = require("../controller/url.js")
router.route("/")
.post(handleGenerateNewURL)
router.get("/analysis/:shortId",getAnalysis)

module.exports = router