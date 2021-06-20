const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')

//show all record router
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => {
      let totalAmount = 0
      for (let i = 0; i < records.length; i++) {
        totalAmount += Number(records[i].amount)
      }
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})



module.exports = router