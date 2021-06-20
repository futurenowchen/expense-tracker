const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')

//show all record router
router.get('/', (req, res) => {
  const filterSelect = '類別'
  Record.find()
    .lean()
    .then(records => {
      let totalAmount = 0
      for (let i = 0; i < records.length; i++) {
        totalAmount += Number(records[i].amount)
      }
      res.render('index', { records, totalAmount, filterSelect })
    })
    .catch(error => console.log(error))
})



module.exports = router