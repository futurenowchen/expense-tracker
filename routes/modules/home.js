const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')

router.get('/', (req, res) => {
  // Record.find({
  //   'category': { $regex: '家居物業' }
  // })
  //   .lean()
  //   .then(records => {
  //     console.log(records[0].category)
  //     res.render('index', { records: records })
  //   })
  //   .catch(error => console.log(error))




  Record.find()
    .lean()
    .then(records => {
      let categoryOutput = []
      let totalAmount = 0
      for (let i = 0; i < records.length; i++) {
        totalAmount += Number(records[i].amount)
        switch (records[i].category) {
          case '家居物業':
            categoryOutput.push('<i class="fas fa-home"></i>')
            break
          case '交通出行':
            categoryOutput.push('<i class="fas fa-shuttle-van"></i>')
            break
          case '休閒娛樂':
            categoryOutput.push('<i class="fas fa-grin-beam"></i>')
            break
          case '餐飲食品':
            categoryOutput.push('<i class="fas fa-utensils"></i>')
            break
          case '其他':
            categoryOutput.push('<i class="fas fa-pen"></i>')
            break
        }
      }
      res.render('index', { records, categoryOutput, totalAmount })
    })
    .catch(error => console.log(error))
})

module.exports = router