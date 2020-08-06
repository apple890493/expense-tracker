const mongoose = require('mongoose')
const Category = require('./category')
const Schema = mongoose.Schema

console.log(Category)

const categorySchema = new Schema({
  title: {
    type: String
  },
  icon: {
    type: String
  }
})

const recordSchema = new Schema({
  name: {
    type: String
  },
  category: {
    type: [categorySchema]
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