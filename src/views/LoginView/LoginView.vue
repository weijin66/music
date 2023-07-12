<template>
  <div>
    <!-- 顶部标题 -->
    <div class="w-[88vw] mx-auto flex justify-between pt-[7vw]">
      <Icon
        icon="formkit:left"
        width="4vw"
        heigt="4vw"
        @click.native="$router.push('/home')"
      />
      <p class="text-[5vw] text-[#737373]">游客登录</p>
    </div>
    <!-- logo -->
    <div class="flex justify-center pt-[15vw]">
      <img
        src="../../static/logo.fill.svg"
        alt="SVG Image"
        class="w-[39vw] h-[7vw]"
      />
    </div>
    <!-- 二维码 -->
    <div v-if="state == 0">
      <div class="flex justify-center pt-[10vw]">
        <img :src="qrcode" alt="" />
      </div>
      <div class="flex justify-center pt-[11vw]">
        <p>使用<span class="text-[#1d7ac3]">网易云音乐APP</span>扫码登录</p>
      </div>
    </div>
    <div v-if="state == 800" class="pt-[10vw] relative">
      <div class="flex justify-center">
        <img :src="qrcode" alt="" />
      </div>
      <div
        class="absolute top-[14vw] left-[30vw] bg-[#dfdfdf] w-[40vw] h-[40vw]"
        :style="{ backgroundColor: `rgba(255,255,255,.5)` }"
      >
        <div
          class="text-center w-[20vw] h-[8vw] bg-[#fe020f] rounded-[16vw] leading-[8vw] text-[#fff] mx-auto mt-[16vw]"
          @click="cliclMe"
        >
          点击刷新
        </div>
      </div>
      <div class="flex justify-center pt-[11vw]">
        <p>使用<span class="text-[#1d7ac3]">网易云音乐APP</span>扫码登录</p>
      </div>
    </div>
    <div v-if="state == 802">
      <div class="flex justify-center mt-[10vw]">
        <img src="../../static/success.png" alt="" class="w-[18vw] h-[39vw]" />
      </div>
      <div class="flex justify-center mt-[8vw]">
        <p class="text-[5vw]">扫描成功</p>
      </div>
      <div class="flex justify-center mt-[6vw]">
        <p>请在手机上确认登录</p>
      </div>
    </div>
    <img src="../../static/bg.jpg" alt="" class="fixed bottom-0" />
  </div>
</template>

<script>
import {
  getQRKey,
  getQrInfo,
  checkQrStatus,
  getUserAccount,
  getUserDetail,
} from '../../request/index.js';
import store from 'storejs';
export default {
  name: 'Login',
  data() {
    return {
      qrcode: '',
      state: 0,
    };
  },
  methods: {
    pollingCheck(key, interval = 1000) {
      const timer = setInterval(async () => {
        const res = await checkQrStatus(key);
        if (res.data.code === 800) {
          this.state = 800;
          clearInterval(timer);
        } else if (res.data.code === 803) {
          console.log(res.data.cookie);
          this.state = 803;
          store.set('__m__cookie', res.data.cookie);
          const user = await getUserAccount();
          store.set('allMsg', user.data);
          console.log('用户信息', user.data);

          const userdata = await getUserDetail(user.data.account.id);
          store.set('userDetail', userdata.data);
          console.log('账号信息', userdata.data);

          this.$router.push('/home');
          clearInterval(timer);
        } else if (res.data.code === 802) {
          this.state = 802;
          console.log(res.data.code);
        }
      }, interval);
      this.$on('hook:beforeDestroy', () => {
        clearInterval(timer);
      });
    },
    cliclMe() {
      this.state = 0;
    },
  },
  async created() {
    const res = await getQRKey().catch((err) => {
      console.log(err);
    });

    const qrInfo = await getQrInfo(res.data.data.unikey).catch((err) => {
      console.log(err);
    });
    this.qrcode = qrInfo.data.data.qrimg;
    this.pollingCheck(res.data.data.unikey);
  },
  beforeDestroy() {
    //页面销毁前做一些事
    console.log('beforeDestroy');
  },
};
</script>
