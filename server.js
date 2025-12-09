// imports ===========================================================================================

require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const methodOverride = require("method-override")
const session = require('express-session')
const {MongoStore} = require("connect-mongo")
const isSignedIn = require("./middleware/isSignedIn")
const passUserToView = require("./middleware/pass-user-to-view.js")
const app = express()
const port = process.env.PORT ? process.env.PORT : "4000" 


// controller(s) =====================================================================================

const authCtrl = require("./controllers/auth")

// cookies ===========================================================================================

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
                mongoUrl: process.env.MONGODB_URI
            })
        })
)

// middleware ========================================================================================

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use(morgan("dev"))

// connecting to DB ==================================================================================

try{
    mongoose.connect(process.env.MONGODB_URI);
    mongoose.connection.on("connected", () => console.log(`Connected to MongoDB: ${mongoose.connection.name}`))
}
catch(err){
    console.log('Ran into an error: ' + err)
}

// Routes ============================================================================================

// Public Routes =====================================================================================

// passing the user
app.use(passUserToView)

// homepage
app.get("/", async (req, res) => {
    res.render('index.ejs')
})

// auth Routes
app.use('/auth' , authCtrl)


// Protected Routes ==================================================================================
app.use(isSignedIn)
app.get('/vip-lounge', async(req,res)=>{
    res.send('VIP PAGE')
})



















// listening =========================================================================================
app.listen(port, () => console.log(`listening on port ${port}`))