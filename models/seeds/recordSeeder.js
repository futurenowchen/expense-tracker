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
    merchant: "全家便利商店"
  },
  {
    name: "捷運",
    category: "交通出行",
    date: "2019-04-23",
    amount: 120,
  },
  {
    name: "電影：驚奇隊長",
    category: "休閒娛樂",
    date: "2019-04-23",
    amount: 220
    merchant: "華納威秀"
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

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(recordSeeders, (recordSeeder) => {
        const { name, category, date, amount } = recordSeeder
        Record.create({ recordSeeder, userId })
      }))
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})

