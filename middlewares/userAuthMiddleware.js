//requring modules
const jwt = require('jsonwebtoken');

//used whre the admin should be auhtenticated aldready
exports.checkUserAuthenticated = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).redirect('/login');
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }
        req.email = user.email;
        next();
    })
};

//used where the admin should not be authenticated aldready
exports.checkUserAldreadyAuthenticated = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token && !req.email) {
        next()
    } else {
        res.redirect('/home')
    }
}