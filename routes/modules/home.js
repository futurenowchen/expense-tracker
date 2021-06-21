const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const Category = require('../../models/Category')
const totalAmountCount = require('../../tools/totalAmountCount')
const categoryIconSwitch = require('../../tools/categoryIconSwitch')
let totalAmount = 0

//show all record router
router.get('/', (req, res) => {
  const filterSelect = '類別'
  Record.find()
    .lean()
    .then(records => {
      totalAmount = totalAmountCount(records, totalAmount)
      categoryIconSwitch(records, Category)
      res.render('index', { records, totalAmount, filterSelect })
    })
    .catch(error => console.log(error))
})



module.exports = router