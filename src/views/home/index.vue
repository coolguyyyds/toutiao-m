<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        slot="title"
        class="search-btn"
        round
        icon="search"
        type="info"
        size="small"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 频道切换 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab :title="item.name" v-for="item in channelList" :key="item.id">
        <article-list :channel="item"></article-list>
      </van-tab>
      <!-- 添加一个占位盒子 但不参与flex运算 -->
      <div slot="nav-right" class="placehoder"></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isEditChannelShow = true"
      >
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- /频道切换 -->
    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="isEditChannelShow"
      position="bottom"
      :style="{ height: '100%' }"
      close-icon-position="top-left"
      closeable
    >
      <ChannelEdit
        :channelList="channelList"
        :active="active"
        @active-update="activeUpdate"
      ></ChannelEdit>
    </van-popup>
    <!-- /频道编辑弹出层 -->
  </div>
</template>

<script>
import { getUserChannelAPI } from '@/api'
import ArticleList from '@/components/article-list'
import ChannelEdit from '@/components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 1,
      channelList: [],
      isEditChannelShow: false
    }
  },
  created () {
    this.getUserChannel()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async getUserChannel () {
      try {
        let channels = []
        const localChannels = getItem('MYCHANNELS')
        if (this.user || !localChannels) {
          const { data } = await getUserChannelAPI()
          channels = data.data.channels
        } else {
          channels = localChannels
        }
        this.channelList = channels
      } catch (err) {
        this.$toast('获取用户频道列表错误, 请稍后重试')
      }
    },
    activeUpdate (index, isEditChannelShow = true) {
      this.active = index
      this.isEditChannelShow = isEditChannelShow
    }
  }

}
</script>

<style lang="less" scoped>
.home-container {
  padding-bottom: 100px;
  padding-top: 174px;
  .page-nav-bar {
    // scoped避免父组件对子组件的样式的影响, 如果去掉scoped的话就会影响全局样式，
    // 但是加上scoped又不能在当前组件修改子组件的样式，这个时候就可以使用 /deep/ 了
    // /deep/ 表示深度选择器
    /deep/.van-nav-bar__title {
      max-width: unset;
      .search-btn {
        width: 555px;
        height: 64px;
        background-color: #5babfb;
        border: 0;
        font-size: 28px;
        .van-icon {
          font-size: 42px;
        }
      }
    }
  }
  /deep/.channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      height: 82px;
      left: 0;
      right: 0;
      z-index: 1;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__line {
      width: 31px;
      height: 6px;
      bottom: 8px;
    }
    .van-tabs__nav {
      padding-bottom: 0;
      padding-right: 0;
    }
    .placehoder {
      width: 66px;
      height: 82px;
      flex-shrink: 0; // 但不参与flex运算
    }
    .hamburger-btn {
      position: fixed;
      display: flex;
      justify-content: center;
      align-items: center;
      right: 0;
      width: 66px;
      height: 82px;
      // background-color: #fff;
      // opacity: 0.9;
      background-color: rgba(255, 255, 255, 0.902);
      i.toutiao {
        font-size: 32px;
      }
      &::before {
        content: "";
        height: 100%;
        // 真实移动设备1px可以显示 浏览器模拟器不能显示
        // 浏览器模拟器2px可以显示 暂时2px 模拟器不一定对 生产版本时转换成1px
        width: 2px;
        position: absolute;
        left: 0;
        background: url("~@/assets/gradient-gray-line.png");
        background-size: contain;
      }
    }
  }
}
</style>
