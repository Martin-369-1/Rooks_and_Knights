//requring modules
const signupFormValidataion = require('../utils/registerValidation')
const userSevice = require('../services/userService');
const resetPasswordServices = require('../services/resetPasswordServices');
const generateAccessToken = require('../utils/JWTUtils')
const passport = require('passport')

//GET login 
exports.getLogin = (req, res) => {
    res.render('user/login')
}

//POST login
exports.postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const userData = await userSevice.findUserByEmail(email);

        if (!userData) {
            return res.status(400).json({ error: 'User does not exist' });
        }

        if (userData.isblocked) {
            return res.status(400).json({ error: 'You are bocked by admin' });
        }

        const isValidPassword = await userSevice.validateUserCredentials(password, userData.password);
        if (!isValidPassword) {
            return res.status(400).json({ error: 'Incorrect password' });
        }

        const accessToken = generateAccessToken(email, userData._id);

        res.cookie('token', accessToken, { httpOnly: true, sameSite: 'Strict' });

        res.redirect('/')
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

//POST logout
exports.postLogout = (req, res) => {
    res.clearCookie('token');
    res.status(200).redirect('/user/login');
}

//GET Register
exports.getRegister = (req, res) => {
    res.render('user/register')
}

//POST Register
exports.postRegister = async (req, res) => {
    try {
        const { username, email, phoneNumber, password, confirmPassword } = req.body;

        const validationError = signupFormValidataion(username, email, password, confirmPassword);

        if (validationError) {
            res.status(400).json({ error: validationError })
        }

        let result = await userSevice.registerUser(username, email, phoneNumber, password, req);

        if (!result.success) {
            // Inform user of the error
            return res.status(400).json({ error: result.message });
        }
        req.session.OTPVerificationRedirect = '/user/completeRegister';
        // Send success response with redirect URL
        res.status(200).json({ redirectUrl: result.redirectUrl });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
}

//GET complete register
exports.getCompleteRegister = (req, res) => {
    res.render('user/completeRegister')
}

//POST complete register
exports.postCompleteRegister = async (req, res) => {
    const { username, email, phoneNumber, password } = req.session;

    const result = await userSevice.saveUserToDB(username, email, phoneNumber, password)

    if (result.success) {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            }

            res.clearCookie();
            res.redirect('/user/login');
        })
    } else {
        console.log("error while complete registration");
    }
}

//google auth
exports.getGoogleCallback = (req, res) => {

    const accessToken = generateAccessToken(req.user.email, req.user._id)

    res.cookie('token', accessToken, { httpOnly: true, sameSite: 'Strict' });

    res.send(`
            <script>
                window.location.href = '/user/account';
            </script>
        `);

}

//render forgot password
exports.getForgetPassword = (req, res) => {
    res.render('user/forgetPassword')
}

//get email for forget password
exports.postForgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        let error = await resetPasswordServices.forgetPassword(email, req)

        if (error) {
            return res.json({ error })
        }
        req.session.OTPVerificationRedirect = '/user/resetPassword';
        res.redirect('/OTP/verifyOTP')

    } catch (err) {
        console.log(err);

    }
}

//render reset password page
exports.getResetPassword = (req, res) => {

    res.render('user/resetPassword')
}

//handle reset  password
exports.postResetPassword = async (req, res) => {
    const { password, confirmPassword } = req.body;
    if (!password || !confirmPassword) {
        return res.status(500).json({ error: 'Server error. Please try again later.' });
    }

    if (password != confirmPassword) {
        return res.json({ error: "password and confirmPassword doesnot match" })
    }

    try {
        await resetPasswordServices.resetPassword(password, req.session.email)

        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            }
            res.clearCookie();
            res.redirect('/user/login');
        })
    } catch (err) {
        console.log("getResetPassword Error", err);

    }
}
