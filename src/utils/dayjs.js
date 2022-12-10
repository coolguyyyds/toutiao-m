import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import Vue from 'vue'
dayjs.extend(relativeTime)
// dayjs 默认语音是英文，将其配置成中文
dayjs.locale('zh-cn')
// console.log(dayjs().format('YYYY-MM-DD'))

Vue.filter('relativeTime', (value) => {
  return dayjs().to(dayjs(value))
})
