function filterByMonth(record, filterSelectByMonth) {

  switch (filterSelectByMonth) {
    case '一月': filterSelectByMonth = 1
      break
    case '二月': filterSelectByMonth = 2
      break
    case '三月': filterSelectByMonth = 3
      break
    case '四月': filterSelectByMonth = 4
      break
    case '五月': filterSelectByMonth = 5
      break
    case '六月': filterSelectByMonth = 6
      break
    case '七月': filterSelectByMonth = 7
      break
    case '八月': filterSelectByMonth = 8
      break
    case '九月': filterSelectByMonth = 9
      break
    case '十月': filterSelectByMonth = 10
      break
    case '十一月': filterSelectByMonth = 11
      break
    case '十二月': filterSelectByMonth = 12
      break
  }

  let month = record.date.getMonth() + 1
  if (month === Number(filterSelectByMonth)) {
    return true
  } else {
    return false
  }
}

module.exports = filterByMonth


