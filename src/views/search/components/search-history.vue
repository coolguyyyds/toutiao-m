<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-search-histories')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon
        v-else
        slot="default"
        name="delete"
        @click="isDeleteShow = true"
      ></van-icon>
    </van-cell>
    <van-cell
      v-for="(item, index) in histories"
      :key="index"
      :title="item"
      @click="onDeleteHistories(item, index)"
    >
      <van-icon name="close" v-show="isDeleteShow"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    histories: {
      typeof: Array,
      require: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  methods: {
    onDeleteHistories (item, index) {
      if (this.isDeleteShow) {
        // 删除状态下
        this.histories.splice(index, 1)
      } else {
        // 非删除状态下
        this.$emit('histories-click', item)
      }
    }
  }
}
</script>

<style>
</style>
