var mongoose = require('mongoose');
const { Schema } = mongoose

var btcSchema = new Schema({
    price: String,
    regdate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Btc', btcSchema);