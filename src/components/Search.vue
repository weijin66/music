<template>
  <!-- 搜索框 -->
  <div class="w-[100vw] flex items-center justify-around mt-3 relative">
    <Icon
      icon="mingcute:menu-fill"
      width="8vw"
      hight="8vw"
      @click.native="show = !show"
    />
    <input
      type="text"
      placeholder="张杰"
      class="w-[72vw] h-[10vw] border-solid border-[0.5vw] rounded-[12vw] border-fuchsia-200 bg-gradient-to-r from-purple-100 to-pink-200 indent-[12vw]"
    />
    <Icon
      icon="circum:search"
      class="absolute top-[2vw] left-[19vw]"
      width="6vw"
      height="6vw"
      color="gray"
    />
    <Icon
      icon="fluent:scan-qr-code-24-filled"
      class="absolute top-[1vw] left-[75vw]"
      width="8vw"
      height="8vw"
      color="gray"
    />
    <Icon
      icon="material-symbols:auto-detect-voice-outline"
      width="8vw"
      hight="8vw"
    />
  </div>
</template>

<script>
export default {
  name: 'search',
  data() {
    return {
      show: false,
      checked: false,
      text: [
        {
          title: '',
          first: [
            {
              icon: 'ic:outline-email',
              msg: '我的消息',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'cib:shell',
              msg: '云贝中心',
              director: '签到',
              icon1: 'mingcute:right-line',
            },

            {
              icon: 'ic:outline-lightbulb',
              msg: '创作者中心',
              director: '',
              icon1: 'mingcute:right-line',
            },
          ],
        },
        {
          title: '音乐服务',
          first: [
            {
              icon: 'file-icons:test-react',
              msg: '趣测',
              director: '点击查看今日运势',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'ion:ticket-outline',
              msg: '云村有票',
              director: '',
              icon1: 'mingcute:right-line',
            },

            {
              icon: 'tabler:brand-pocket',
              msg: '多多西西口袋',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'material-symbols:local-mall-outline-rounded',
              msg: '商城',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'simple-icons:beats',
              msg: 'Beat专区',
              director: '顶级创作邀你创作',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'ri:bell-line',
              msg: '口袋彩铃',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'icon-park-outline:game-three',
              msg: '游戏专区',
              director: '音乐浇灌治愈花园',
              icon1: 'mingcute:right-line',
            },
          ],
        },
        {
          title: '其他',
          first: [
            {
              icon: 'arcticons:set-edit',
              msg: '设置',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'circum:dark',
              msg: '深色模式',
              director: '',
              icon1: 'mingcute:right-line',
              btn: true,
            },

            {
              icon: 'ri:time-line',
              msg: '定时关闭',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'icon-park-outline:clothes-crew-neck',
              msg: '个性装扮',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'ic:twotone-headset',
              msg: '边听边存',
              director: '未开启',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'icon-park-outline:online-meeting',
              msg: '在线听歌免流量',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'arcticons:callsblacklist',
              msg: '音乐黑名单',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'el:ok-circle',
              msg: '青少年模式',
              director: '未开启',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'iconoir:clock',
              msg: '音乐闹钟',
              director: '',
              icon1: 'mingcute:right-line',
            },
          ],
        },
        {
          title: '',
          first: [
            {
              icon: 'icon-park-outline:transaction-order',
              msg: '我的订单',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'mdi:coupon-outline',
              msg: '优惠券',
              director: '',
              icon1: 'mingcute:right-line',
            },

            {
              icon: 'mdi:customer-service',
              msg: '我的客服',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'ph:share-fill',
              msg: '分享网易云音乐',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'streamline:interface-file-clipboard-text-edition-form-task-checklist-edit-clipboard',
              msg: '个人信息收集与使用清单',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'uiw:information-o',
              msg: '个人信息第三方共享清单',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'uiw:information-o',
              msg: '个人信息与隐私保护',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'uiw:information-o',
              msg: '关于',
              director: '',
              icon1: 'mingcute:right-line',
            },
          ],
        },
      ],
    };
  },
};
</script>

<style></style>
