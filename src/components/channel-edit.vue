<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        type="danger"
        class="edit-btn"
        size="mini"
        @click="isEdit = !isEdit"
        round
        plain
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <!-- 我的频道 -->
    <van-grid gutter="8" class="my-grid">
      <van-grid-item
        class="grid-item"
        v-for="(item, index) in channelList"
        :key="item.id"
        @click="onChannelClick(item, index)"
      >
        <van-icon
          v-show="isEdit && !fixedChannel.includes(item.id)"
          slot="icon"
          name="clear"
        ></van-icon>
        <span slot="text" class="text" :class="{ active: index === active }">{{
          item.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <!-- /我的频道 -->
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid gutter="8" class="recommend-grid">
      <van-grid-item
        class="grid-item"
        icon="plus"
        v-for="item in recommondChannel"
        :key="item.id"
        :text="item.name"
        @click="onAddChannel(item)"
      />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import { allChannelAPI, updateChannelsAPI, deleteChannelAPI } from '@/api'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  props: {
    channelList: {
      type: Array,
      require: true
    },
    active: {
      type: Number,
      require: true
    }
  },
  created () {
    this.getAllChannel()
  },
  computed: {
    ...mapState(['user']),
    recommondChannel () {
      return this.allChannel.filter(item => {
        // find方法 返回符合条件的第一个元素
        return !this.channelList.find(el => el.id === item.id)
      })
    }
  },
  data () {
    return {
      allChannel: [],
      isEdit: false,
      fixedChannel: [0]
    }
  },
  methods: {
    async getAllChannel () {
      try {
        const { data } = await allChannelAPI()
        this.allChannel = data.data.channels
      } catch (err) {
        this.$toast('出错，请刷新')
      }
    },
    async onAddChannel (channel) {
      this.channelList.push(channel)
      if (this.user) {
        // 登录状态
        try {
          await updateChannelsAPI({
            id: channel.id,
            seq: this.channelList.length
          })
        } catch (err) {
          this.$toast('失败, 请稍后重试')
        }
      } else {
        // 未登录状态
        setItem('MYCHANNELS', this.channelList)
      }
    },
    onChannelClick (channel, index) {
      if (this.isEdit) {
        if (this.fixedChannel.includes(channel.id)) return
        this.channelList.splice(index, 1)
        if (this.active >= index) {
          this.$emit('active-update', this.active - 1)
        }
        // 处理删除频道数据持久化
        this.deleteChannel(channel)
      } else {
        this.$emit('active-update', index, false)
      }
    },
    async deleteChannel (channel) {
      if (this.user) {
        try {
          await deleteChannelAPI(channel.id)
        } catch (err) {
          this.$toast('删除失败, 请稍后重试')
        }
      } else {
        setItem('MYCHANNELS', this.channelList)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 86px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/.grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f5f5f6;
      .van-grid-item__text,
      .text {
        margin-top: 0;
        font-size: 28px;
        color: rgb(54, 32, 32);
      }
      .active {
        color: red;
      }
    }
  }
  /deep/.recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
  /deep/.my-grid {
    .grid-item {
      .van-grid-item__icon-wrapper {
        position: unset;
        .van-icon-clear {
          position: absolute;
          top: -10px;
          right: -10px;
          font-size: 28px;
          z-index: 2;
          color: #cacaca;
        }
      }
    }
  }
}
</style>
