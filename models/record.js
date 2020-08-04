const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String
  },
  categorty: {
    type: String
  },
  date: {
    type: String
  },
  amount: {
    type: Number
  },
  trader: {
    type: String
  }
})

module.exports = mongoose.model('Record', recordSchema)