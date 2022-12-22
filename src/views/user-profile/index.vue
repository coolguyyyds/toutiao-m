<template>
  <div class="user-profile">
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <input type="file" ref="file" @change="onFileChange" hidden />
    <van-cell
      @click="$refs.file.click()"
      class="photo-cell"
      title="头像"
      center
      is-link
    >
      <van-image class="avatar" round fit="cover" :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      @click="isUpdateNameShow = true"
      :value="user.name"
      is-link
    />
    <van-cell
      title="性别"
      @click="isUpdateSexShow = true"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
    />
    <van-cell
      title="生日"
      @click="isUpdateBirthdayShow = true"
      :value="user.birthday"
      is-link
    />
    <van-popup
      v-model="isUpdateNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-name
        v-if="isUpdateNameShow"
        v-model="user.name"
        @close="isUpdateNameShow = false"
      ></update-name>
    </van-popup>
    <van-popup v-model="isUpdateSexShow" position="bottom">
      <update-sex
        v-if="isUpdateSexShow"
        v-model="user.gender"
        @close="isUpdateSexShow = false"
      ></update-sex>
    </van-popup>
    <van-popup v-model="isUpdateBirthdayShow" position="bottom">
      <update-birthday
        v-if="isUpdateBirthdayShow"
        v-model="user.birthday"
        @close="isUpdateBirthdayShow = false"
      ></update-birthday>
    </van-popup>
    <van-popup v-model="isUpdatePhotoShow" position="bottom" :style="{ height: '100%' }">
      <update-photo v-if="isUpdatePhotoShow" @update-user-avatar="user.photo = $event" @close="isUpdatePhotoShow = false" :img="img"></update-photo>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfileAPI } from '@/api'
import UpdateName from './components/update-name'
import UpdateSex from './components/update-sex'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateSex,
    UpdateBirthday,
    UpdatePhoto
  },
  data () {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateSexShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null
    }
  },
  created () {
    this.getUserProfile()
  },
  methods: {
    async getUserProfile () {
      try {
        const { data } = await getUserProfileAPI()
        this.user = data.data
      } catch (err) {
        console.log(err)
      }
    },
    onFileChange () {
      const file = this.$refs.file.files[0]
      // 基于文章对象获取blob数据
      this.img = window.URL.createObjectURL(file)
      this.isUpdatePhotoShow = true
      // 当选择同一张照片作为头像时, 不会触发input的change事件
      // 需要手动去清空文件内容
      // file-input 如果选了同一个文件不会触发 change 事件
      // 解决办法就是每次使用完毕，把它的 value 清空
      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
.user-profile {
  .avatar {
    height: 60px;
    width: 60px;
  }
  .van-popup {
    background: #f5f7f9;
  }
  .photo-cell {
    .van-cell__value {
      display: flex;
      flex-direction: row-reverse;
    }
  }
}
</style>
