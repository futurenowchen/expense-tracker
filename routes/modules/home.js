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
  Promise.all([Record.find().lean(), Category.find().lean()])
    .then(results => {
      const [records, categories] = results
      totalAmount = totalAmountCount(records, totalAmount)
      categoryIconSwitch(records, categories)
      res.render('index', { records, totalAmount, filterSelect })
    })
    .catch(error => console.log(error))
})



module.exports = router