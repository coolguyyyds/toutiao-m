<template>
  <div class="my-container">
        <!-- 登录头部状态 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image
            class="avatar"
            fit="cover"
            round
            :src="userInfo.photo"
          />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button type="default" size="mini" to="/user/profile" round>编辑资料</van-button>
        </div>
      </div>
      <div class="user-state">
        <div class="state-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="state-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">经验</span>
        </div>
        <div class="state-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="state-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- /登录头部状态 -->

    <!-- 未登录头部 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="">
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- /未登录头部 -->

    <!--  宫格导航-->
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-item" icon="photo-o" text="文字">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item" icon="photo-o" text="文字">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!--  /宫格导航-->

    <van-cell title="消息通知"  is-link/>
    <van-cell title="小智同学" class="mb-9px" is-link/>
    <van-cell class="loginout-cell" @click="onLoginout" v-if="user" title="退出登录" clickable/>
  </div>
</template>

<script>
// 使用频繁的话可以使用映射方法 不频繁的话直接访问
import { mapState } from 'vuex'
import { getUserInfoAPI } from '@/api'
export default {
  name: 'MyIndex',
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    if (this.user) {
      this.getUserInfo()
    }
  },
  methods: {
    onLoginout () {
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗?'
      })
        .then(() => {
          // on confirm
          // 确认退出: 清除vuex State中的user 和 本地存储的user
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
          console.log('取消执行')
        })
    },
    async getUserInfo () {
      try {
        const { data } = await getUserInfoAPI()
        this.userInfo = data.data
      } catch (err) {
        // 当 token 过期后清除user中的token 请用户重新登录
        // this.$store.commit('setUser', null)
        this.$toast('错误, 请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.my-container{
  .header{
    height: 360px;
    background: url('~@/assets/banner.png');
    background-size: cover;
    &.not-login{
      display: flex;
      justify-content: center;
      align-items: center;
      .login-btn{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        img.mobile-img{
          width: 132px;
          height: 132px;
          margin-bottom: 15px;
        }
        span.text{
          font-size: 28px;
          color: #fff;
        }
      }
    }
    &.user-info{
      .base-info{
        height: 230px;
        padding: 76px 32px 23px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left{
          display: flex;
          align-items: center;
          .avatar{
            width: 132px;
            height: 132px;
            border: 4px solid #fff;
            margin-right: 23px;
          }
          .name{
            font-size: 30px;
            color: #fff;
          }
        }
      }
      .user-state{
        height: 130px;
        display: flex;
        align-items: center;
        .state-item{
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #fff;
          .count{
            font-size: 36px;
          }
          .text{
            font-size: 23px;
          }
        }
      }
    }
  }
  .grid-nav{
    .grid-item{
      height: 141px;
      i.toutiao{
        font-size: 45px;
      }
      span.text{
        font-size: 28px;
      }
      .toutiao-shoucang{
        color: #eb5253;
      }
      .toutiao-lishi{
        color: #ff9d1d;
      }
    }
  }
  .loginout-cell{
    text-align: center;
    color: #d86262;
  }
  .mb-9px{
    margin-bottom: 9px;
  }
}
</style>
