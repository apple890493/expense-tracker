const express = require('express')
//handlebars 樣本引擎
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Handlebars = require('handlebars') //導入nandlebars
const bodyParser = require('body-parser') //導入body-parser解析req.body
const Record = require('./models/record') //導入record資料表
const Category = require('./models/category') //導入category資料表

const app = express()
const port = 3000

//MongoDB
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
//mongoose 連線狀況
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb ok!')
})


//middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))


//setting Handlebars helper for index
Handlebars.registerHelper("match", function (a, b, options) {
  if (a === b)
    return options.fn(this)
})


//routes
//all
app.get('/', (req, res) => {
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


//new
app.get('/expense/new', (req, res) => {
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

app.get('/expense/:id/edit', (req, res) => {
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

app.post('/expense', (req, res) => {
  const item = req.body
  console.log(req.body)
  return Record.create(item)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.post('/expense/:id/edit', (req, res) => {
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

app.post('/expense/:id/delete', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


//filters
app.get('/expense/filter', (req, res) => {
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



//web
app.listen(port, () => {
  console.log(`localhost:${port}`)
})