const express = require('express')
const router = express.Router()
const { handleUiComponent, handleAdminURL } = require('../controllers/url')
const { restrictTo } = require('../middleware/auth')

router.get('/admin/urls', restrictTo(['ADMIN']), handleAdminURL)

router.get('/', restrictTo(["NORMAL", "ADMIN"]), handleUiComponent)

router.get('/signup', (req, res) => {
    return res.render('signup')
})

router.get('/login', (req, res) => {
    return res.render('login')
})

module.exports = router;
