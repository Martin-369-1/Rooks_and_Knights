const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const walletSchema = Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    }
})

const wallet = mongoose.model('wallet', walletSchema)

module.exports = wallet;