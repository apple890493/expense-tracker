const db = require('../../config/mongoose')
const Category = require('../category')

db.once('open', () => {
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

