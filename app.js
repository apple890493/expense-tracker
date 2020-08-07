const express = require('express')
//handlebars 樣本引擎
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Handlebars = require('handlebars') //導入nandlebars
const bodyParser = require('body-parser') //導入body-parser解析req.body
const Record = require('./models/record') //導入record資料表
const Category = require('./models/category') //導入category資料表

const routes = require('./routes')
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
app.use(routes)


//setting Handlebars helper for index
Handlebars.registerHelper("match", function (a, b, options) {
  if (a === b)
    return options.fn(this)
})



//web
app.listen(port, () => {
  console.log(`localhost:${port}`)
})