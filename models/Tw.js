const mongoose = require('mongoose');
const moment = require('moment');

const TwSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: moment().format('MMMM Do YYYY, h:mm:ss a')
    }
});

module.exports = mongoose.model('Tw', TwSchema);