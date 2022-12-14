const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quoteSchema = new Schema({
  quote: {
    type: String,
  },
  author: {
    type: String,
  },
  year: {
    type: Number,
  },
  userId: {
    type: String
  }
});

module.exports = mongoose.model('Quote', quoteSchema);
