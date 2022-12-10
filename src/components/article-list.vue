<template>
  <div class="article-container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :success-text="toastText" success-duration="1500">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.title" /> -->
        <ArticleItem v-for="(item,index) in list" :key="index" :article="item" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesAPI } from '@/api'
import ArticleItem from '@//components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      refreshing: false, // 下拉刷新状态
      toastText: '刷新成功'
    }
  },
  methods: {
    // setTimeout 仅做示例，真实场景中一般为ajax请求;初始化会触发该函数,当数据没有铺满屏幕时会再次触发该事件
    async onLoad () {
      try {
        // 1.获取数据 异步更新数据
        const { data } = await getArticlesAPI({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        const { results } = data.data
        // 制造错误(err)后面的代码不用执行
        // if (Math.random() > 0.5) {
        //   JSON.parse('dfadfadd')
        // }
        // 2.把新获取到的下一页数据添加到list数组末尾
        this.list.push(...results)
        // 3.加载状态结束 重新设置当前加载状态
        this.loading = false
        // 4.数据全部加载完成 不再进行数据更新
        if (results.length) {
          // 更新获取下一页的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 数据加载完毕 提示用户没有更多的数据了
          this.finished = true
        }
      } catch (err) {
        // 显示错误提示状态
        this.error = true
        // 请求错误也需要 关闭Loading
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        const { data } = await getArticlesAPI({
          channel_id: this.channel.id,
          timestamp: Date.now(), // 下拉刷新得到最新的数据
          with_top: 1
        })
        const { results } = data.data
        this.list.unshift(...results)
        this.toastText = `刷新成功，更新了${results.length}条数据`
        this.refreshing = false
      } catch (err) {
        this.toastText = '刷新失败, 请重试'
        this.refreshing = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-container{
  // 产生自己的滚动容器
  height: 79vh;
  overflow-y: auto;
}
</style>
