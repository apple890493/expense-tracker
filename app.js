const express = require('express')
//handlebars 樣本引擎
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars') //導入handlebars
const bodyParser = require('body-parser') //導入body-parser解析req.body
const methodOverride = require('method-override')

require('./config/mongoose')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)
//setting Handlebars helper for index
Handlebars.registerHelper("match", function (a, b, options) {
  if (a === b)
    return options.fn(this)
})

//web
app.listen(PORT, () => {
  console.log(`App is running on App is running on http://localhost:${PORT}`)
})