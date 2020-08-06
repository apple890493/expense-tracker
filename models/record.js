const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String
  },
  category: {
    type: String
  },
  date: {
    type: String
  },
  amount: {
    type: Number
  }
})

module.exports = mongoose.model('Record', recordSchema)