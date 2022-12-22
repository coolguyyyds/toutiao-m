<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="黑马头条" fit="fixed">
      <van-icon
        slot="left"
        name="arrow-left"
        size="20"
        @click="$router.back()"
      />
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->
      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail markdown-body">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <!-- v-model 是@input和:value的组合 一个组件上只能使用一次v-model 多次使用可以使用.sync修饰符-->
          <FollowsUser
            class="follow-btn"
            v-model="article.is_followed"
            :autId="articleId"
          ></FollowsUser>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content"
          ref="article-content"
          v-html="article.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论列表 -->
        <comment-list
          @comment-info="totalCommentCount = $event.total_count"
          :source="article.art_id"
          :list="commentList"
          @reply-click="onReplyClick"
        ></comment-list>
        <!-- /文章评论列表 -->
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            @click="popupShow = true"
            round
            size="small"
            >写评论</van-button
          >
          <van-icon name="comment-o" :badge="totalCommentCount" color="#777" />
          <CollectionArticle
            class="btn-item"
            :articleId="article.art_id"
            v-model="article.is_collected"
          ></CollectionArticle>
          <LikeArticle
            class="btn-item"
            :article-id="article.art_id"
            v-model="article.attitude"
          ></LikeArticle>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <!-- 评论弹出层 -->
        <van-popup v-model="popupShow" position="bottom">
          <comment-post @post-success="onPostSuccess" :target="article.art_id"></comment-post>
        </van-popup>
        <!-- /评论弹出层 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errorStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 回复弹出层 -->
    <!-- 弹出层是懒渲染的:只有在第一次展示的时候才会渲染里面的内容 -->
    <van-popup v-model="isReplyShow" position="bottom" style="height: 100%;">
      <CommentReply v-if="isReplyShow" @close-reply="isReplyShow = false" :comment="commentReply"></CommentReply>
    </van-popup>
    <!-- /回复弹出层 -->
  </div>
</template>

<script>
import { getArticlesDetailAPI } from '@/api'
import { ImagePreview } from 'vant'
import FollowsUser from '@/components/follows-user'
import CollectionArticle from '@/components/collection-article'
import LikeArticle from '@/components/like-article'
import CommentList from './components/comment-list'
import CommentPost from './components/comment-post'
import CommentReply from './components/comment-reply'
export default {
  name: 'ArticleIndex',
  components: {
    FollowsUser,
    CollectionArticle,
    LikeArticle,
    CommentList,
    CommentPost,
    CommentReply // 当前评论回复对象
  },
  // 给所有的后代组件提供数据
  // 注意：不要滥用
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  props: {
    articleId: {
      type: [String, Number, Object],
      requried: true
    }
  },
  data () {
    return {
      article: {},
      loading: true,
      errorStatus: 0,
      isLoading: false,
      totalCommentCount: 0,
      popupShow: false,
      commentList: [],
      isReplyShow: false,
      commentReply: {}
    }
  },
  methods: {
    async loadArticle () {
      this.loading = true
      try {
        const { data } = await getArticlesDetailAPI(this.articleId)
        // if (Math.random() > 0.2) {
        //   JSON.parse('dsdddd')
        // }
        this.article = data.data
        setTimeout(() => {
          this.previewImg()
        }, 0)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errorStatus = err.response.status
        }
        console.log('获取文章详情失败')
      }
      this.loading = false
    },
    previewImg () {
      const content = this.$refs['article-content']
      const imgs = content.querySelectorAll('img')
      const images = []
      imgs.forEach((item, index) => {
        images.push(item.currentSrc)
        item.onclick = () => {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    onPostSuccess (data) {
      this.popupShow = false
      this.commentList.unshift(data.new_obj)
    },
    onReplyClick (comment) {
      this.commentReply = comment
      this.isReplyShow = true
    }
  },
  created () {
    this.loadArticle()
  }
}
</script>

<style lang="less" scoped>
@import url("./github-markdown.css");
.article-container {
  .main-wrap {
    padding-top: 92px;
    padding-bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .btn-item {
      border: none;
      padding: 0;
      height: 40px;
      line-height: 40px;
      color: #777;
    }
    /deep/.van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
