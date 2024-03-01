//根据key找到对应对象
export function parseJson(jsonObj, key, value) {
    //过滤函数
    // 循环所有键
    let array = []
    for (const v in jsonObj) {
      const element = jsonObj[v]
      // 1.判断是对象或者数组
      if (typeof element == 'object') {
        const result = parseJson(element, key, value)
        if (result.length) {
          array = array.concat(result)
        }
      } else {
        if (v == key) {
          if (element == value) {
            array.push(jsonObj)
          }
        }
      }
    }
    return array
  }
  //搜索功能函数
export function searchFun(arr, attr, val) {
    if (!Array.isArray(arr)) {
      return false
    }
    for (const item of arr) {
      if (item.title.indexOf('全国') == 0 && !attr.length) {
        attr.push(item.key)
      }
      if (item.title.indexOf(val) == 0) {
        attr.push(item.key)
      } else {
        if (item.children instanceof Array) {
          searchFun(item.children, attr, val)
        }
      }
    }
  }