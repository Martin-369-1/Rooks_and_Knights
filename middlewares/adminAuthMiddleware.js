//requring modules
const jwt = require('jsonwebtoken');

//used whre the user should be auhtenticated aldready
exports.checkAdminAuthenticated = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).redirect('/admin/login');
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).redirect('/admin/login')
        }
        req.email = user.email;
        
        next();
    })
};

//used where the user should not be authenticated aldready
exports.checkAdminAldreadyAuthenticated = (req, res, next) => {
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
    })

    return res.redirect('/admin')
}