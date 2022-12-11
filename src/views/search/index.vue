<template>
  <div class="search-container">
    <!-- action="/" ios系统显示键盘搜索按钮 -->
    <form action="/">
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
    <search-result v-if="isResultShow"></search-result>
    <search-suggest v-else-if="value"></search-suggest>
    <search-history v-else></search-history>
  </div>
</template>

<script>
import SearchResult from './components/search-result'
import SearchSuggest from './components/search-suggest'
import SearchHistory from './components/search-history'
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
      isResultShow: false
    }
  },
  methods: {
    onSearch (val) {
      this.$toast(this.value)
      this.isResultShow = true
      this.value = ''
    },
    onCancel () {
      this.$toast('取消')
      this.$router.back()
    },
    onFocus () {
      this.isResultShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.search-container{
  .van-search__action{
    color: #fff;
  }
}
</style>
