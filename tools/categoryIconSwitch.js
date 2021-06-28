function categoryIconSwitch(categoryName, categories) {
  const category = categories.find(category => category.category === categoryName)
  return category.icon
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