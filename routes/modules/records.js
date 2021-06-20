const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')

//新增支出記錄頁面路由
router.get('/new', (req, res) => {
  return res.render('new')
})

//新增支出記錄功能路由
router.post('/', (req, res) => {
  const newRecord = req.body
  return Record.create({
    name: newRecord.name,
    category: newRecord.categories,
    date: newRecord.date,
    amount: newRecord.amount
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.post('/category', (req, res) => {
  const filterSelect = req.body.filterSelect
  console.log(filterSelect)
  if (filterSelect === '不分類') {
    res.redirect('/')
  } else {
    Record.find({ 'category': { $regex: filterSelect, $options: '$i' } })
      .lean()
      .then(records => {
        let totalAmount = 0
        for (let i = 0; i < records.length; i++) {
          totalAmount += Number(records[i].amount)
        }
        res.render('index', { records, totalAmount, filterSelect })
      })
      .catch(error => console.log(error))
  }
})

//修改支出記錄頁面路由
router.get('/:record_id/edit', (req, res) => {
  const id = req.params.record_id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
})

//修改支出記錄功能路由
router.put('/:record_id', (req, res) => {
  const id = req.params.record_id
  const editRecord = req.body
  return Record.findById(id)
    .then(records => {
      records.name = editRecord.name,
        records.category = editRecord.categories,
        records.date = editRecord.date,
        records.amount = editRecord.amount
      return records.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


//刪除支出記錄路由
router.delete('/:record_id', (req, res) => {
  const id = req.params.record_id
  return Record.findById(id)
    .then(records => records.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router