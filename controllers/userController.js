//requring modules
const signupFormValidataion = require('../utils/registerValidation')
const userSevice = require('../services/userService');

//GET login 
exports.getLogin = (req, res) => {
    res.render('userViews/login')
}

//POST login
exports.postLogin = (req, res) => {

}

//GET Register
exports.getRegister = (req, res) => {
    res.render('userViews/register')
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

        // Send success response with redirect URL
        res.status(200).json({ redirectUrl: result.redirectUrl });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
}

