const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../Record')
const User = require('../user')
const db = require('../../config/mongoose')

const recordSeeders = [
  {
    name: "午餐",
    category: "餐飲食品",
    date: "2019-04-23",
    amount: 60,
    merchant: "青島排骨"
  },
  {
    name: "晚餐",
    category: "餐飲食品",
    date: "2019-04-23",
    amount: 60,
    merchant: "青島排骨"
  },
  {
    name: "午餐",
    category: "餐飲食品",
    date: "2019-05-23",
    amount: 60,
    merchant: "青島排骨"
  },
  {
    name: "晚餐",
    category: "餐飲食品",
    date: "2019-05-23",
    amount: 60,
    merchant: "全家便利商店"
  },
  {
    name: "捷運",
    category: "交通出行",
    date: "2019-06-23",
    amount: 120,
  },
  {
    name: "晚餐",
    category: "餐飲食品",
    date: "2019-06-23",
    amount: 60,
    merchant: "全家便利商店"
  },
  {
    name: "電影：驚奇隊長",
    category: "休閒娛樂",
    date: "2019-07-23",
    amount: 220,
    merchant: "華納威秀"
  },
  {
    name: "租金",
    category: "家居物業",
    date: "2019-07-23",
    amount: 25000
  },
  {
    name: "租金",
    category: "家居物業",
    date: "2019-08-23",
    amount: 25000
  },
  {
    name: "孝親費",
    category: "其他",
    date: "2019-08-23",
    amount: 10000
  },
  {
    name: "孝親費",
    category: "其他",
    date: "2019-09-23",
    amount: 10000
  },
  {
    name: "電影：玩命關頭九",
    category: "休閒娛樂",
    date: "2019-09-23",
    amount: 220,
    merchant: "華納威秀"
  }
]

const SEED_USER = [{
  name: 'root',
  email: 'root@example.com',
  password: '12345678',
  records: recordSeeders
}]

db.once('open', () => {
  Promise.all(Array.from(SEED_USER, (seedUser) => {
    const { name, email, password, records } = seedUser
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({ name, email, password: hash }))
      .then(user => {
        return Promise.all(Array.from(records, (record) => {
          const { name, category, date, amount, merchant } = record
          const userId = user._id
          return Record.create({ name, category, date, amount, merchant, userId })
        }))
      })
  }))
    .then(() => {
      console.log('done.')
      process.exit()
    })
})

