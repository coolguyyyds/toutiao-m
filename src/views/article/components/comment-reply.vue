<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('close-reply')"
      ></van-icon>
    </van-nav-bar>
    <div class="scroll-wrap">
      <comment-item :comment="comment">123</comment-item>
      <van-cell title="全部回复"></van-cell>
      <comment-list :list="commentList" :source="comment.com_id" type="c"></comment-list>
    </div>
    <div class="post-wrap">
      <van-button class="post-btn" size="small" @click="isPostShow=true" round>发布评论</van-button>
    </div>
    <van-popup v-model="isPostShow" position="bottom">
      <comment-post :target="comment.com_id" @post-success="onPostSuccess"></comment-post>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list'
import CommentPost from './comment-post'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  props: {
    comment: {
      type: Object,
      requried: true
    }
  },
  data () {
    return {
      isPostShow: false,
      commentList: []
    }
  },
  methods: {
    onPostSuccess (data) {
      this.comment.reply_count++
      this.isPostShow = false
      // 将最新回复内容展示到列表顶部
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style lang="less" scoped>
.scroll-wrap {
  position: fixed;
  top: 92px;
  bottom: 88px;
  left: 0;
  right: 0;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  height: 88px;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>
