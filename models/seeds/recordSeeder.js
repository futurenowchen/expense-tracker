const Record = require('../Record')
const db = require('../../config/mongoose')

const recordSeeder = [
  {
    name: "午餐",
    category: "餐飲食品",
    date: "2019-04-23",
    amount: 60
  },
  {
    name: "晚餐",
    category: "餐飲食品",
    date: "2019-04-23",
    amount: 60
  },
  {
    name: "捷運",
    category: "交通出行",
    date: "2019-04-23",
    amount: 120
  },
  {
    name: "電影：驚奇隊長",
    category: "休閒娛樂",
    date: "2019-04-23",
    amount: 220
  },
  {
    name: "租金",
    category: "家居物業",
    date: "2019-04-23",
    amount: 25000
  },
  {
    name: "孝親費",
    category: "其他",
    date: "2019-04-23",
    amount: 10000
  }
]

db.once('open', () => {
  Record.create(recordSeeder)
    .then(() => {
      console.log('recordSeeder done')
      return db.close()
    })
    .then(() => {
      console.log('mongodb disconnected!')
    })
    .catch(err => console.log(err))
})