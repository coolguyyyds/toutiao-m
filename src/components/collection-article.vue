<template>
  <van-button
    :class="{ collected: value }"
    :icon="value ? 'star' : 'star-o'"
    @click="onCollect"
    :loading="isLoading"
  />
</template>

<script>
import { collectArticleAPI, cancelArticleAPI } from '@/api'
export default {
  name: 'CollectionArticle',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    async onCollect () {
      this.isLoading = true
      try {
        if (this.value) {
          // 取消收藏
          await cancelArticleAPI(this.articleId)
        } else {
          // 文章收藏
          await collectArticleAPI(this.articleId)
        }
        // 自定义事件修改数据并不是立即的
        this.$emit('input', !this.value)
        this.$toast(!this.value ? '收藏成功' : '取消收藏')
      } catch (err) {
        this.$toast('失败, 请稍后重试')
      }
      this.isLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>
