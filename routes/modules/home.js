const express = require('express')

const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

//all view
router.get('/', (req, res) => {
  let totalAmount = 0
  Record.find()
    .lean()
    .sort({ date: '1' })
    .then(records => {
      totalAmount += records.map(record => record.amount).reduce((a, b) => { return a + b }, 0)
      Category.find()
        .lean()
        .sort({ _id: '1' })
        .then(categories => res.render('index', { records, totalAmount, categories }))
    })
    .catch(error => console.log(error))
})

module.exports = router