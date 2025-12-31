const express = require('express')
const { handleSignUpRequest, handleLoginUpRequest } = require('../controllers/user')

const router = express.Router()

router.post('/', handleSignUpRequest)
router.post('/login', handleLoginUpRequest)

module.exports = router;