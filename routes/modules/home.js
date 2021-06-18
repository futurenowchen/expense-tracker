const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')

router.get('/', (req, res) => {
  console.log(Record)
  res.render('index')
})

module.exports = router