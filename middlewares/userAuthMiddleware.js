const userCollection=require('../models/userModel')
//requring modules
const jwt = require('jsonwebtoken');

//used whre the admin should be auhtenticated aldready
exports.checkUserAuthenticated = async(req, res, next) => {
    try{
        const token = req.cookies.token;
        
        if (!token) {
            
            return res.status(401).redirect('user/login');
        }
    
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

            
            if (err) {
                
                return res.status(403).redirect('user/login');
            }
            req.email = user.email;
        })

        let user=await userCollection.findOne({email:req.email});
        // console.log(user);
        if(user.isblocked){
            console.log(5);
            
            return res.status(403).redirect('/user/login');
        }
        
        next();

    }catch(err){
        
    }

    
};    

//used where the admin should not be authenticated aldready
exports.checkUserAldreadyAuthenticated = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        next()
        return 
    }
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            next()
            return
        }
        req.email=user.email;
    })

    let user=await userCollection.findOne({email:req.email});
    if(user.isblocked){
            next()
            return
    }

    return res.redirect('/user/home')
}