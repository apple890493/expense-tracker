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
        .then(cotegories => res.render('index', { records, totalAmount, cotegories }))
    })
    .catch(error => console.log(error))
})

//new
app.get('/expense/new', (req, res) => {
  Category.find()
    .lean()
    .sort({ _id: '1' })
    .then(cotegories => res.render('new', { cotegories }))
    .catch(error => console.log(error))
})

app.get('/expense/:id/edit', (req, res) => {
  const id = req.params.id
  return Category.find()
    .lean()
    .sort({ _id: '1' })
    .then(cotegories => {
      Record.findById(id)
        .lean()
        .then((record) =>
          res.render('edit', { record, cotegories }))
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


//web
app.listen(port, () => {
  console.log(`localhost:${port}`)
})