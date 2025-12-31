const { getUser } = require('../services/auth')

const checkForAuthentication = (req, res, next) => {
    const authHeaderValue = req.cookies?.token;
    req.user = null;
    if (!authHeaderValue) return next()


    const token = authHeaderValue
    const user = getUser(token)

    req.user = user
    return next()
}

const restrictTo = (roles = []) => {
    return function (req, res, next) {
        if (!req.user) return res.redirect('/login')

        if (!roles.includes(req.user.role)) return res.end("UnAuthorized")

        return next();
    }
}

module.exports = {
    checkForAuthentication,
    restrictTo
}