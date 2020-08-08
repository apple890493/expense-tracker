const express = require('express')

const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')


//new
router.get('/new', (req, res) => {
  const local = new Date()
  let day = local.getDate()
  let month = local.getMonth() + 1
  const year = local.getFullYear()
  if (day < 10) {
    day = "0" + day
  }
  if (month < 10 || day < 10) {
    month = "0" + month
  }

  const today = year + "-" + month + "-" + day
  console.log(today)

  return Category.find()
    .lean()
    .sort({ _id: '1' })
    .then(categories => res.render('new', { categories, today }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Category.find()
    .lean()
    .sort({ _id: '1' })
    .then(categories => {
      Record.findById(id)
        .lean()
        .then((record) =>
          res.render('edit', { record, categories }))
    })
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const item = req.body
  return Record.create(item)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.post('/:id/edit', (req, res) => {
  const newItem = req.body
  const id = req.params.id
  return Record.findById(id)
    .then(record => {
      record = Object.assign(record, newItem)
      record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.post('/:id/delete', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router