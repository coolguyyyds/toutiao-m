<template>
  <div class="search-container">
    <!-- action="/" ios系统显示键盘搜索按钮 -->
    <form action="/" class="search-form">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="onFocus"
        background="#3296fa"
      />
    </form>
    <search-result v-if="isResultShow" :search-text="value"></search-result>
    <search-suggest v-else-if="value" :search-text="value" @search="onSearch"></search-suggest>
    <search-history :histories="histories" @histories-click="onSearch" @clear-search-histories="histories = []" v-else></search-history>
  </div>
</template>

<script>
import SearchResult from './components/search-result'
import SearchSuggest from './components/search-suggest'
import SearchHistory from './components/search-history'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'Search',
  components: {
    SearchResult,
    SearchSuggest,
    SearchHistory
  },
  data () {
    return {
      value: '',
      isResultShow: false,
      histories: getItem('SEARCH_HISTORIES') || []
    }
  },
  methods: {
    onSearch (val) {
      this.value = val
      const index = this.histories.indexOf(val)
      if (index !== -1) {
        this.histories.splice(index, 1)
      }
      this.histories.unshift(val)
      // 搜索渲染结果
      this.isResultShow = true
    },
    onCancel () {
      this.$toast('取消')
      this.$router.back()
    },
    onFocus () {
      this.isResultShow = false
    }
  },
  watch: {
    histories (value) {
      setItem('SEARCH_HISTORIES', value)
    }
  }
}
</script>

<style lang="less" scoped>
.search-container{
  padding-top: 108px;
  .van-search__action{
    color: #fff;
  }
  .search-form{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 2;
  }
}
</style>
