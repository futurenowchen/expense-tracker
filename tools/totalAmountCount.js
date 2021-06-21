function totalAmountCount(records, totalAmount) {
  totalAmount = 0
  for (let i = 0; i < records.length; i++) {
    totalAmount += Number(records[i].amount)
  }
  return totalAmount
}

module.exports = totalAmountCount
