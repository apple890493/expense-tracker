const db = require('../../config/mongoose')
const Record = require('../record')
const recordData = require('./record.json')

db.once('open', () => {
  for (let i = 0; i < recordData.length; i++) {
    Record.create(recordData[i])
  }
  console.log('recordSeeder done!')
})
