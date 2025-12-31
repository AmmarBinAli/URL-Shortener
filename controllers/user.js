const User = require('../models/users')
const { v4: uuidv4 } = require('uuid')
const { setUser } = require('../services/auth')

const handleSignUpRequest = async (req, res) => {
    const { name, email, password } = req.body;

    await User.create({
        name,
        email,
        password
    });

    return res.redirect('/');
};

const handleLoginUpRequest = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
        password
    });
    if (!user) {
        return res.render("login", {
            error: 'Invalid Credentials'
        });
    }
    const token = setUser(user)
    res.cookie("token", token)
    return res.redirect('/')
}

module.exports = {
    handleSignUpRequest,
    handleLoginUpRequest
};
