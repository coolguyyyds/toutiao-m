<template>
  <div class="update-name">
    <van-nav-bar
      title="昵称设置"
      left-text="返回"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <div class="field-wrap">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { editUserProfileAPI } from '@/api'
export default {
  name: 'UpdateName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  methods: {
    async onConfirm () {
      try {
        this.$toast.loading({
          message: '保存中...',
          forbidClick: true, // 禁止背景点击
          duration: 0 // 持续展示
        })
        const localName = this.localName
        if (!localName.length) {
          this.$toast('输入不能为空')
          return
        }
        await editUserProfileAPI({
          name: localName
        })
        this.$toast.success('修改成功')
        this.$emit('input', localName)
        this.$emit('close')
      } catch (err) {
        this.$toast.fail('修改失败, 请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.field-wrap {
  padding: 20px;
}
</style>
