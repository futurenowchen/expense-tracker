function dataFormat(records) {
  for (let i = 0; i < records.length; i++) {
    let year = String(records[i].date.getFullYear())
    let month = String(records[i].date.getMonth() + 1)
    let day = String(records[i].date.getDate())
    records[i].date = year + '-' + month + '-' + day
  }
  return records
}

module.exports = dataFormat