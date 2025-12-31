const { nanoid } = require('nanoid')
const URL = require('../models/url')

const handleConvertURL = async (req, res) => {
    const body = req.body
    if (!body.url) return res.status(400).json({ error: "Url is required" })
    const shortId = nanoid(8)
    await URL.create({
        shortID: shortId,
        redirectURL: body.url,
        totalClicks: [],
        createdBy: req.user._id
    })

    return res.render('index', { id: shortId })
}

const handleUseConvertURL = async (req, res) => {
    const shortID = req.params.shortId
    const entry = await URL.findOneAndUpdate({
        shortID,
    },
        {
            $push: {
                totalClicks: {
                    timestamp: Date.now()
                }
            }
        },
        { new: true }
    );
    if (!entry) {
        return res.status(400).json({ error: "ShortId URL not found" })
    }
    res.redirect(entry.redirectURL)
}

const handleGetAnalytics = async (req, res) => {
    const shortID = req.params.shortId;
    const result = await URL.findOne({ shortID })
    return res.json({ totalClicks: result.totalClicks.length, analytics: result.totalClicks })
}

const handleUiComponent = async (req, res) => {
    const allURL = await URL.find({ createdBy: req.user._id })
    return res.render('index', 
        { urls: allURL }
    )
}

const handleAdminURL = async(req, res) => {
    const allURL = await URL.find({})
    return res.render('index', 
        { urls: allURL }
    )
}

module.exports = {
    handleConvertURL,
    handleUseConvertURL,
    handleGetAnalytics,
    handleUiComponent,
    handleAdminURL
}