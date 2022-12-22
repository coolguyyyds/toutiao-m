<template>
  <van-cell class="article-item" :to="{name: 'article', params: {articleId: article.art_id}}">
    <div slot="title" class="title van-multi-ellipsis--l2">{{ article.title }}</div>
    <div slot="label">
      <div class="item-warp" v-if="article.cover.type === 3">
        <div
          class="cover-item"
          v-for="(item, index) in article.cover.images"
          :key="index"
        >
          <van-image class="cover-item-img" fit="cover"  :src="item" />
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>评论:{{ article.comm_count }}</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <van-image v-if="(article.cover.type === 1)" class="right-img" fit="cover" slot="default"  :src="article.cover.images[0]" />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.article-item{
  .title{
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value{
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-img{
    width: 232px;
    height: 146px;
  }
  .label-info-wrap span{
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .item-warp{
    display: flex;
    padding: 26px 0;
    .cover-item{
      flex: 1;
      &:not(last-child){
      padding-right: 4px;
    }
      .cover-item-img{
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
