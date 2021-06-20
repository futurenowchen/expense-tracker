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

//修改支出記錄頁面路由
router.get('/:record_id/edit', (req, res) => {
  const id = req.params.record_id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
})

module.exports = router