/**
 *  存储数据
 */
export const setItem = (key, value) => {
  // 将数组对象类型的数据转换成JSON格式
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
/**
 * 读取本地缓存数据
 */
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
/**
 * 删除本地缓存数据
 */
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
