const express = require('express')

const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  let totalAmount = 0
  const title = req.query.by
  if (title === 'all') {
    res.redirect('/')
  } else {
    Record.find({ "category": { "$all": [title] } })
      .lean()
      .then(records => {
        totalAmount += records.map(record => record.amount).reduce((a, b) => { return a + b }, 0)
        Category.find()
          .lean()
          .sort({ _id: '1' })
          .then(categories => res.render('index', { records, categories, totalAmount }))
          .catch(error => console.log(error))
      })
  }
})

module.exports = router