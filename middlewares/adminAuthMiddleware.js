const jwt = require('jsonwebtoken');
const adminService = require('../services/adminService');

// Middleware to check if the user is already authenticated
exports.checkAdminAuthenticated = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).redirect('/admin/login');
    }

    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        const adminData = await adminService.findUserByEmail(user.email);

        if (!adminData) {
            return res.status(403).redirect('/admin/login');
        }

        req.email = user.email;
        next(); 
    } catch (err) {
        return res.status(403).redirect('/admin/login');
    }
};

exports.validAdmin= async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({validationError:true,redirectUrl:'/admin/login'});
    }

    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        const adminData = await adminService.findUserByEmail(user.email);

        if (!adminData) {
            return res.status(403).json({validationError:true,redirectUrl:'/admin/login'});
        }

        req.email = user.email;
        next(); 
    } catch (err) {
        return res.status(403).json({validationError:true,redirectUrl:'/admin/login'});
    }
};

// Middleware to check if the user is already authenticated
exports.checkAdminAldreadyAuthenticated = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return next();
    }

    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.email = user.email;

        const adminData = await adminService.findUserByEmail(req.email);

        if (!adminData) {
            return next();
        }

        return res.redirect('/admin');
    } catch (err) {
        return next();
    }
};
