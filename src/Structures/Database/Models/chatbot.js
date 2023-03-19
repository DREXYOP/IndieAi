const mongoose = require('mongoose')

const ignoreSchema = new mongoose.Schema({
    channelId: String,
    type: String
})

module.exports = mongoose.model('Ignore', ignoreSchema);