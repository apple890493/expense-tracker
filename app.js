const express = require('express')
//handlebars 樣本引擎
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
// 載入 Record model
const Record = require('./models/record')
// 載入 Category model
const Category = require('./models/category')
const record = require('./models/record')

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

//routes
app.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ date: '1' })
    .then(records => {
      const totalAmount = records.map(record => record.amount).reduce((a, b) => { return a + b }, 0)
      Category.find()
        .lean()
        .sort({ _id: '1' })
        .then(cotegories => res.render('index', { records, totalAmount, cotegories }))
    })
    .catch(error => console.log(error))
})


//web
app.listen(port, () => {
  console.log(`localhost:${port}`)
})