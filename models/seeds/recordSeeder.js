const mongoose = require('mongoose')
const Record = require('../record')
const recordData = require('./record.json')

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('record mongodb ok!')
  for (let i = 0; i < recordData.length; i++) {
    Record.create(recordData[i])
  }
  console.log('record done!')
})
