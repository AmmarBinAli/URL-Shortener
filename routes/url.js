const express = require('express')
const {handleConvertURL, handleUseConvertURL, handleGetAnalytics} = require('../controllers/url')

const router = express.Router()


router.post('/', handleConvertURL)
router.get('/:shortId', handleUseConvertURL)
router.get('/analytics/:shortId', handleGetAnalytics)

module.exports = router