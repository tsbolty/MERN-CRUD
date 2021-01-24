const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestModel = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

const Test = mongoose.model('Test', TestModel);

module.exports = Test;