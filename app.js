const express = require('express')
//handlebars 樣本引擎
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

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


//routes
app.get('/', (req, res) => {
  res.render('index')
})

//web
app.listen(port, () => {
  console.log(`localhost:${port}`)
})