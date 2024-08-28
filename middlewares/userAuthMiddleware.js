const userCollection = require('../models/userModel')
//requring modules
const jwt = require('jsonwebtoken');

//used whre the admin should be auhtenticated aldready used in get
exports.checkUserAuthenticated = async (req, res, next) => {
    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).redirect('/user/login');
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {


            if (err) {

                return res.status(403).redirect('/user/login');
            }
            req.email = user.email;
            console.log(user.email, user._id);

            req.userID = user._id;
            let userData = await userCollection.findOne({ email: req.email });
            if (userData.isblocked) {
                return res.status(403).redirect('/user/login');
            }

            next();
        })
    } catch (err) {
        console.log(err);
    }
};

//used in post request
exports.validUser = async (req, res, next) => {
    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ error: 'You must login first to continue', errorRedirect: `<a href="/user/login">Login here</a>` });
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {


            if (err) {

                return res.status(403).json({ error: 'You must login first to continue', errorRedirect: `<a href="/user/login">Login here</a>` });
            }
            req.email = user.email;
            console.log(user.email, user._id);

            req.userID = user._id;
            let userData = await userCollection.findOne({ email: req.email });
            if (userData.isblocked) {
                return res.status(403).json({ error: 'You are blocked', errorRedirect: `<a href="/user/login">Login here</a>` });
            }

            next();
        })
    } catch (err) {
        console.log(err);
    }
};

//used where the admin should not be authenticated aldready
exports.checkUserAldreadyAuthenticated = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return next()
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) {
            return next()

        }
        req.email = user.email;
        let userexist = await userCollection.findOne({ email: req.email });
        if (userexist.isblocked) {
            next()
            return
        }
        res.redirect('/')
    })

}