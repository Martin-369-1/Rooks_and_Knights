//Requiring modules
require('dotenv').config();
const express = require('express');
const app = express();
const nocache = require('nocache');
const cookieParser = require('cookie-parser');
const session=require('express-session');
const methodOverride = require('method-override');
const flash = require('connect-flash');

//Setting view engine
app.set('view engine','ejs')
app.locals.title="Rooks & Knights"
//Middlewares
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use('/public', express.static('public')); //setting public folder
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(nocache())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: process.env.COOKIE_VALID_MINUTES * 60 * 1000,  
        secure: false, 
        httpOnly: true, 
        sameSite: 'strict'
    }
}));
app.use(flash())


//Routers
const userRouter=require('./routers/userRoute');
const OTPRouter=require('./routers/OTPRouter');
const adminRouter=require('./routers/adminRouter');
const homeRouter=require('./routers/homeRouter');

//Database
const connectDb=require('./config/database');
connectDb()

//Running Server
app.listen(process.env.PORT,()=>{
    console.log(`Server is running at http://localhost:${process.env.PORT}`);    
})

//Using Routers
app.use('/user',userRouter);
app.use('/OTP',OTPRouter);
app.use('/admin',adminRouter);
app.use('/',homeRouter);


app.get('/error',(req,res)=>{
    res.status(500).render('serverError')
})


app.use((req,res,next)=>{
    res.status(404).render('404')
})
