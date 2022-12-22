<template>
  <div class="update-photo">
    <img class="avatar-img" :src="img" ref="avatar" />
    <div class="tool-bar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { editUserAvatarAPI } from '@/api'
export default {
  name: 'UpdatePhoto',
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  mounted () {
    const image = this.$refs.avatar
    this.cropper = new Cropper(image, {
      viewMode: 1, // 定义裁剪模式，0：裁剪框可以扩展到画布外， 1,2,3会将裁剪框限制在画布内
      dragMode: 'move', // 拖动模式 move: 移动画布
      aspectRatio: 1, // 截图比例, 1:1可以简写为1
      // autoCropArea: 1, // 自动截图区
      cropBoxMovable: false, // 截图区域是否可以移动
      cropBoxResizable: false, // 截图区的缩放功能
      background: false, // 是否显示默认背景
      movable: true // 背景图片是否可以移动，默认true
    })
  },
  methods: {
    onConfirm () {
      // 纯客户端的裁切使用 getCroppedCanvas 获取裁切的文件对象
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        this.updateUserAvatar(blob)
      })
    },
    async updateUserAvatar (blob) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        const formData = new FormData()
        formData.append('photo', blob)
        const { data } = await editUserAvatarAPI(formData)
        this.$emit('close')
        this.$emit('update-user-avatar', data.data.photo)
        this.$toast.success('修改成功')
      } catch (err) {
        this.$toast.fail('失败, 请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.update-photo {
  height: 100%;
  background-color: #000;
  img {
    display: block;
    max-width: 100%;
  }
  .tool-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      height: 90px;
      width: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
</style>
