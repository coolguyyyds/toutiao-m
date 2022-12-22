<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{comment.aut_name}}</div>
      <van-button
        class="like-btn"
        @click="onLike"
        :loading="isLoading"
        :class="{liked: comment.is_liking}"
        :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
      >{{comment.like_count || '赞'}}</van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{comment.content}}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{comment.pubdate | relativeTime}}</span>
        <van-button
          class="reply-btn"
          round
          @click="$emit('reply-click', comment)"
        >回复 {{comment.reply_count}}</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { commentLikeAPI, cancelCommentLikeAPI } from '@/api'
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isLoading: false,
      commentClone: this.comment
    }
  },
  methods: {
    async onLike () {
      this.isLoading = true
      try {
        if (this.comment.is_liking) {
          await cancelCommentLikeAPI(this.comment.com_id)
          this.commentClone.like_count--
        } else {
          await commentLikeAPI(this.comment.com_id)
          this.commentClone.like_count++
        }
        this.commentClone.is_liking = !this.comment.is_liking
      } catch (err) {
        this.$toast('错误, 请稍后重试')
      }
      this.isLoading = false
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    // width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
    &.liked {
      color: #e5645f;
    }
  }
}
</style>
