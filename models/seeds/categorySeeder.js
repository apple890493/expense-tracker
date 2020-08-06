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
      categoryName: "家居物業",
      categoryIcon: "fas fa-home"
    },
    {
      categoryName: "交通出行",
      categoryIcon: "fas fa-shuttle-van"
    },
    {
      categoryName: "休閒娛樂",
      categoryIcon: "fas fa-grin-beam"
    },
    {
      categoryName: "餐飲食品",
      categoryIcon: "fas fa-utensils"
    },
    {
      categoryName: "其他",
      categoryIcon: "fas fa-pen"
    }
  )
  console.log('categorySeeder done!')
})
