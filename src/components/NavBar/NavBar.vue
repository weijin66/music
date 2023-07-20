<template>
  <div>
    <van-tabbar
      v-model="active"
      active-color="red"
      inactive-color=" #9598a4"
      route
    >
      <van-tabbar-item to="/home">
        <template>
          <Icon icon="ri:netease-cloud-music-fill" width="8vw" />
        </template>
        <span>发现</span>
      </van-tabbar-item>
      <van-tabbar-item to="/mv">
        <template>
          <Icon icon="icon-park-outline:share-sys" width="8vw" />
        </template>
        <span>播客</span>
      </van-tabbar-item>
      <van-tabbar-item>
        <template>
          <Icon icon="majesticons:music-line" width="8vw" />
        </template>
        <span>我的</span>
      </van-tabbar-item>
      <van-tabbar-item>
        <template>
          <Icon icon="iconoir:user-love" width="8vw" />
        </template>
        <span>关注</span>
      </van-tabbar-item>
      <van-tabbar-item>
        <template>
          <Icon icon="ri:wechat-line" width="8vw" />
        </template>
        <span>社区</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style>
.van-tabbar-item__text {
  text-align: center;
}
</style>
