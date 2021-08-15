const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const Category = require('../../models/Category')
const totalAmountCount = require('../../tools/totalAmountCount')
const categoryIconSwitch = require('../../tools/categoryIconSwitch')
const dataFormat = require('../../tools/dataFormat')
const filterByMonth = require('../../tools/filterByMonth')

let totalAmount = 0

//新增支出記錄頁面路由
router.get('/new', (req, res) => {
  return res.render('new')
})

//新增支出記錄功能路由
router.post('/', (req, res) => {
  const userId = req.user._id
  const newRecord = req.body
  return Record.create({
    name: newRecord.name,
    category: newRecord.categories,
    date: newRecord.date,
    amount: newRecord.amount,
    merchant: newRecord.merchant,
    userId: userId
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//篩選類別路由
router.post('/category', (req, res) => {
  const userId = req.user._id
  const filterSelect = req.body.filterSelect
  const filterSelectByMonth = req.body.filterSelectByMonth
  const recordPromise = Record.find({ userId }).lean().sort({ _id: 'asc' })
  const categoryPromise = Category.find().lean()

  Promise.all([recordPromise, categoryPromise])
    .then(results => {
      const [records, categories] = results

      const filteredRecords = records.filter(record => {
        if (filterSelect && filterSelectByMonth) {
          return record.category === filterSelect && filterByMonth(record, filterSelectByMonth)
        } else if (filterSelect) {
          return record.category === filterSelect
        } else if (filterSelectByMonth) {
          return filterByMonth(record, filterSelectByMonth)
        } else {
          return records
        }
      })
      categoryIconSwitch(records, categories)
      totalAmount = totalAmountCount(filteredRecords, totalAmount)
      dataFormat(filteredRecords)
      res.render('index', { records: filteredRecords, totalAmount, filterSelect, filterSelectByMonth })
    })
    .catch(error => console.log(error))
})

//修改支出記錄頁面路由
router.get('/:record_id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.record_id
  return Record.findOne({ _id, userId })
    .lean()
    .then((record) => res.render('edit', { record }))
})

//修改支出記錄功能路由
router.put('/:record_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.record_id
  const editRecord = req.body
  return Record.findOne({ _id, userId })
    .then(records => {
      records.name = editRecord.name,
        records.category = editRecord.categories,
        records.date = editRecord.date,
        records.amount = editRecord.amount,
        records.merchant = editRecord.merchant
      return records.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


//刪除支出記錄路由
router.delete('/:record_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.record_id
  return Record.findOne({ _id, userId })
    .then(records => records.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router