<template>
  <van-button
    v-if="isFollowed"
    round
    size="small"
    @click="onFollows"
    :loading="isLoading"
    >已关注</van-button
  >
  <van-button
    v-else
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollows"
    :loading="isLoading"
    >关注</van-button
  >
</template>

<script>
import { addFollowsAPI, deleteFollowsAPI } from '@/api'
export default {
  name: 'FollowsUser',
  // 自定义model数据名称
  model: {
    prop: 'isFollowed',
    event: 'update-isFollowed'
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    autId: {
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
    async onFollows () {
      this.isLoading = true
      try {
        if (this.isFollowed) {
          await deleteFollowsAPI(this.autId)
        } else {
          await addFollowsAPI(this.autId)
        }
        this.$emit('update-isFollowed', !this.isFollowed)
      } catch (err) {
        let message = '失败, 请稍后重试'
        if (err.response && err.response.status === 400) {
          message = '错误, 不能关注自己!'
        }
        this.$toast(message)
      }
      this.isLoading = false
    }
  }
}
</script>

<style>
</style>
