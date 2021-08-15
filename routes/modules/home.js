const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const Category = require('../../models/Category')
const totalAmountCount = require('../../tools/totalAmountCount')
const categoryIconSwitch = require('../../tools/categoryIconSwitch')
const dataFormat = require('../../tools/dataFormat')
let totalAmount = 0

//show all record router
router.get('/', (req, res) => {
  const filterSelect = req.body.filterSelect
  const filterSelectByMonth = req.body.filterSelectByMonth
  const userId = req.user._id
  Promise.all([Record.find({ userId }).lean(), Category.find().lean()])
    .then(results => {
      const [records, categories] = results
      totalAmount = totalAmountCount(records, totalAmount)
      categoryIconSwitch(records, categories)
      dataFormat(records)
      res.render('index', { records, totalAmount, filterSelectByMonth, filterSelect })
    })
    .catch(error => console.log(error))
})



module.exports = router