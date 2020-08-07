const express = require('express')
//handlebars 樣本引擎
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars') //導入nandlebars
const bodyParser = require('body-parser') //導入body-parser解析req.body

require('./config/mongoose')
const routes = require('./routes')

const app = express()
const port = 3000

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