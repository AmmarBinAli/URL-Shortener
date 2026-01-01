const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const app = express()
require('dotenv').config()

const urlStatus = require('./routes/url')
const viewData = require('./routes/viewdata')
const userRoute = require('./routes/user')
const { connectToMongoURL } = require('./connection')
const URL = require('./models/url')
const { checkForAuthentication, restrictTo } = require('./middleware/auth')

connectToMongoURL('mongodb://localhost:27017/short-url').then(() => console.log("MongoDB Connected"))

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(checkForAuthentication)

app.use('/', viewData)


app.get('/', async (req, res) => {
    const allURLs = await URL.find({ createdBy: req.user._id })
    return res.render("index", {
        urls: allURLs
    })
})

app.use('/url', restrictTo(["NORMAL", "ADMIN"]), urlStatus)
app.use('/user', userRoute)

app.listen(process.env.PORT, () => console.log(`Server started at port ${[process.env.PORT]}`))