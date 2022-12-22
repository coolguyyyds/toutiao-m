<template>
  <div class="update-sex">
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
    />
  </div>
</template>

<script>
import { editUserProfileAPI } from '@/api'
export default {
  name: 'UpdateSex',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      localGender: 0
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
        const localGender = this.localGender
        await editUserProfileAPI({
          gender: localGender
        })
        this.$toast.success('修改成功')
        this.$emit('input', localGender)
        this.$emit('close')
      } catch (err) {
        this.$toast.fail('修改失败, 请稍后重试')
      }
    },
    onChange (picker, value, index) {
      this.localGender = index
    }
  }
}
</script>

<style>
</style>
