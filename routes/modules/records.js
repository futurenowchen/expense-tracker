const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')

//渲染新增支出記錄頁面路由
router.get('/new', (req, res) => {
  return res.render('new')
})

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

module.exports = router