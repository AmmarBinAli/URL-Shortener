const mongoose = require('mongoose')

const connectToMongoURL = async(url) => {
    return mongoose.connect(url)
}

module.exports = {
    connectToMongoURL
}