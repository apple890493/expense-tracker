const mongoose = require('mongoose')
const Category = require('../category')

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('catergory mongodb ok!')
  Category.create(
    {
      title: "家居物業",
      icon: "fas fa-home"
    },
    {
      title: "交通出行",
      icon: "fas fa-shuttle-van"
    },
    {
      title: "休閒娛樂",
      icon: "fas fa-grin-beam"
    },
    {
      title: "餐飲食品",
      icon: "fas fa-utensils"
    },
    {
      title: "其他",
      icon: "fas fa-pen"
    }
  )
  console.log('categorySeeder done!')
})

