function categoryIconSwitch(records, categories) {
  records.forEach(record => {
    categories.forEach(category => {
      if (record.category === category.category) {
        record.category = category.icon
      }
    })
  })
  return records
}

module.exports = categoryIconSwitch




// 類別轉換icon的function，舊的方式，備存

  // function categoryOutput(category, id) {
  //   let categoryOutput = document.querySelector('#' + id)
  // switch (category) {
  //     case '家居物業':
  // categoryOutput.innerHTML = '<i class="fas fa-home"></i>'
  // break
  // case '交通出行':
  // categoryOutput.innerHTML = '<i class="fas fa-shuttle-van"></i>'
  // break
  // case '休閒娛樂':
  // categoryOutput.innerHTML = '<i class="fas fa-grin-beam"></i>'
  // break
  // case '餐飲食品':
  // categoryOutput.innerHTML = '<i class="fas fa-utensils"></i>'
  // break
  // case '其他':
  // categoryOutput.innerHTML = '<i class="fas fa-pen"></i>'
  // break
  //   }
  // }