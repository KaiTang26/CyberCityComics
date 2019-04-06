const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const CountSchema = new Schema({
    num: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        required: true
    }

});

module.exports = Count = mongoose.model('count', CountSchema);