//Requiring modules
require('dotenv').config();
const express = require('express');
const app = express();
const nocache = require('nocache');
const cookieParser = require('cookie-parser');
const session=require('express-session');

//Setting view engine
app.set('view engine','ejs')

//Middlewares
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use('/public', express.static('public')); //setting public folder
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(nocache())
app.use(session({
    secret: process.env.SESSION_SECRE,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: process.env.COOKIE_VALID_MINUTES * 60 * 1000,  
        secure: false, 
        httpOnly: true, 
        sameSite: 'strict'
    }
}));

//Routers



//Database
const connectDb=require('./config/database')

//Running Server
app.listen(process.env.PORT,()=>{
    console.log(`Server is running at http://localhost:${process.env.PORT}`);    
})

app.get('/',(req,res)=>{
    res.send("MY WEBSITE")
})