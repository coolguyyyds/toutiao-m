<template>
  <div class="login-container" >
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录"  >
      <van-icon slot="left" name="cross" size="18" @click="$router.back()" />
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 表单 -->
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
      <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="codeNumber"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
      <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
      <template #button>
        <van-count-down :time="(1000*60)" v-if="codeFlag" @finish="codeFlag = false" format=" ss 秒" />
        <van-button class="send-code-btn" v-else native-type="button" @click="sendCode" round size="small" type="default">发送验证码</van-button>
      </template>
      </van-field>
      <div class="login-btn-wrapper">
        <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <!-- /表单 -->
  </div>
</template>

<script>
import { loginAPI, sendCodeAPI } from '@/api'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      // 表单输入规则验证
      userFormRules: {
        mobile: [{
          required: true
        },
        {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机格式错误'
        }],
        code: [{
          required: true
        },
        {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      codeFlag: false
    }
  },
  methods: {
    // 表单提交
    async onSubmit () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0 // 提示框持续时间默认为两秒
      })
      const user = this.user
      try {
        const res = await loginAPI(user)
        this.$toast.success('登录成功')
        this.$store.commit('setUser', res.data.data)
        // 功能优化再做修改 该方法不严谨
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('账号或验证码出现错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },
    // 发送验证
    async sendCode () {
      // 1.手机号验证
      try {
        await this.$refs.form.validate('mobile')
        console.log('验证通过')
      } catch (err) {
        return console.log('验证失败', err)
      }
      try {
        // 3.请求发送验证码
        await sendCodeAPI(this.user.mobile)
        this.$toast('验证码发送成功')
        // 2.验证通过显示倒计时
        this.codeFlag = true
      } catch (err) {
        this.codeFlag = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁, 请稍后重试')
        } else {
          this.$toast('发送失败, 请稍后重试')
        }
      }
    }

  }
}
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-code-btn {
    width: 156px;
    height: 46px;
    background-color: #ededed;
    color: #666;
    font-size: 22px;
  }
  .login-btn-wrapper{
    padding: 53px 33px;
    .login-btn{
      background-color: #6db4fb;
      border: 0;
    }
  }
}
</style>
