<template>
  <div class="search-suggest">
    <van-cell v-for="(item, index) in suggestList" :key="index" @click="$emit('search', item)" icon="search">
      <div slot="title" v-html="hightLight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { searchSuggestionAPI } from '@/api'
// 按需导入的优点: 只会把使用到的成员打包到结果中
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggest',
  props: {
    searchText: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      suggestList: []
    }
  },
  watch: {
    searchText: {
      immediate: true,
      handler: debounce(function (value) {
        this.getSearchSuggestion(value)
      }, 200)
    }
  },
  methods: {
    async getSearchSuggestion (value) {
      try {
        const { data } = await searchSuggestionAPI(value)
        this.suggestList = data.data.options
      } catch (err) {
        this.$toast('失败, 请求稍后重试')
      }
    },
    hightLight (text) {
      if (!text) return
      const replaceStr = `<span class="active">${this.searchText}</span>`
      // 正则表达式 // 中间的内容都会当作匹配字符来使用, 也不是数据变量
      // 如果需要根据数据变量动态的创建正则表达式, 则手动 new RegExp
      // RegExp 正则表达式构造函数
      // 参数1: 匹配字符串, 它会根据这个字符串创建正则对象
      // 参数2: 匹配模式,要写到字符串中\
      // const reg = new RegExp(this.searchText, 'ig')
      // return text.replace(reg, replaceStr)

      // 第二种写法
      return text.split(this.searchText).join(replaceStr)
    }
  }
}
</script>

<style lang="less" scoped>
.search-suggest {
  /deep/.active {
    color: #3296fa;
  }
}
</style>
