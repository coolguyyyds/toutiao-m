<template>
  <div class="post-comment">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论将会被优先展示"
      show-word-limit
    />
    <van-button class="post-btn" size="small" @click="onPost" :disabled="!message.length">发布</van-button>
  </div>
</template>

<script>
import { addCommentAPI } from '@/api'
export default {
  name: 'CommentPost',
  data () {
    return {
      message: ''
    }
  },
  inject: {
    articleId: {
      type: [String, Number, Object],
      default: null
    }
  },
  props: {
    target: {
      type: [String, Number, Object],
      required: true
    }
  },
  methods: {
    async onPost () {
      try {
        this.$toast.loading({
          message: '发布中...',
          forbidClick: true,
          duration: 0 // 提示框持续时间默认为两秒
        })
        const { data } = await addCommentAPI({
          target: this.target,
          content: this.message,
          art_id: this.articleId ? this.articleId : null
        })
        this.message = ''
        this.$emit('post-success', data.data)
        this.$toast.success('发布成功')
      } catch (err) {
        this.$toast.fail('错误, 请稍后再试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
