var mongoose = require('mongoose');
const { Schema } = mongoose

var todoSchema = new Schema({
    content: String,
    title: String,
    isdone : Boolean,
    regdate: { type: Date, default: Date.now  }
});

module.exports = mongoose.model('Todo', todoSchema);