<template>
  <van-button
    :loading="isLoading"
    :class="{ collected: value === 1 }"
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    @click="onLike"
  />
</template>

<script>
import { likeArticleAPI, cancelLikeArticleAPI } from '@/api'
export default {
  name: 'LikeArticle',
  props: {
    value: {
      type: Number,
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
    async onLike () {
      this.isLoading = true
      try {
        let status = -1
        if (this.value === 1) {
          // 取消点赞
          await cancelLikeArticleAPI(this.articleId)
        } else {
          // 点赞文章
          await likeArticleAPI(this.articleId)
          status = 1
        }
        // 自定义事件修改数据并不是立即的
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        this.$toast.fail('失败, 请稍后重试')
      }
      this.isLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.collected {
  .van-icon {
    color: red;
  }
}
</style>
