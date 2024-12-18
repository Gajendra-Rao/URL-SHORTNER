const express = require("express");
const app = express();
const path = require("path")
const {checkForAuthentication, restrictTO} = require("./middlewares/auth")
const cookieParser = require("cookie-parser")
const {connectMongoDB} = require("./connection")
const urlRoute = require("./routes/url")
const staticRoute  = require("./routes/staticRoute")
const userRoute = require("./routes/user")
const PORT = 3000;
const URL = require("./model/url")


connectMongoDB("mongodb://127.0.0.1:27017/skibidi")
.then(()=>console.log("mongoDB connected succesfully"))
.catch((e)=>console.log("Error agya ", e))
app.set("view engine" , "ejs")
app.set("views", path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(checkForAuthentication);


app.use("/user", userRoute)
app.use("/url",restrictTO(["NORMAL"]),urlRoute)
app.use("/",staticRoute)
app.get("/home/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId : shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    res.redirect(entry.redirectURL);
 });

app.listen(PORT,()=>
    `app is listening to ${PORT}`
)