<template>
  <div
    class="w-[100vw] overflow-hidden bg-purple-100"
    :style="{ height: `${drawerVisible ? '100vh' : ''}` }"
  >
    <!-- 搜索框 -->
    <search></search>
    <!-- 轮播图 -->
    <swipe :banners="banners"></swipe>
    <!-- 菜单部分 -->
    <menulist :menulist="menulist"></menulist>
    <!-- 推荐歌单 -->
    <recommendedsonglist
      :personalized="personalized"
      @updateMsg="showTitle"
      :title="show"
    ></recommendedsonglist>
    <!-- 新歌新碟\数字专辑 -->
    <newsongs
      :newAlbum="newAlbum"
      resources="resources"
      @updateMsg="showTitle"
      :title="show"
    ></newsongs>
    <!-- 排行榜 -->
    <rankinglist
      :blocks="blocks"
      @updateMsg="showTitle"
      :title="show"
    ></rankinglist>
    <!-- 音乐日历 -->
    <musiccalendar
      :calendar="calendar"
      @updateMsg="showTitle"
      :title="show"
    ></musiccalendar>
    <!-- 从下往上弹出封装的组件 -->
    <drawer :visible.sync="drawerVisible" direction="btt" :test="show">
      <template #header>
        <div
          class="flex justify-between items-center border-b-[0.2vw] pt-2 pl-5"
        >
          <p>{{ show }}</p>
          <Icon
            @click.native="closeDrawer"
            icon="carbon:close-filled"
            color="#f1f3f4"
            width="8vw"
            height="8vw"
            class="mr-3"
          />
        </div>
      </template>
      <div class="flex items-center mt-2 ml-3">
        <Icon
          icon="iconamoon:like-bold"
          color="#000"
          width="6vw"
          height="6vw"
        />
        <p class="ml-3">优先推荐</p>
      </div>
      <div class="flex items-center mt-9 ml-3">
        <Icon
          icon="basil:heart-off-outline"
          color="#000"
          width="6vw"
          height="6vw"
        />
        <p class="ml-3">减少推荐</p>
      </div>
      <div class="flex items-center mt-9 ml-3">
        <Icon
          icon="mingcute:more-4-line"
          color="#000"
          width="6vw"
          height="6vw"
        />
        <p class="ml-3">更多内容</p>
        <!-- <p>{{ show }}</p> -->
      </div>
    </drawer>
  </div>
</template>

<script>
import {
  BlockPage,
  DragonBall,
  Personalized,
  Calendar,
} from '../../request/index';
// import Scrollbar from '@better-scroll/scroll-bar';
// BScroll.use(Scrollbar);

export default {
  data() {
    return {
      menu: [],
      banners: [],
      menulist: [],
      personalized: [],
      newAlbum: [],
      blocks: [],
      calendar: [],
      activeMenuItem: '',
      drawerVisible: false,
      visible: true,
      show: '',
    };
  },
  components: {
    search: () => import('../../components/Search.vue'),
    swipe: () => import('../../components/Swiper.vue'),
    menulist: () => import('../../components/MenuList.vue'),
    recommendedsonglist: () =>
      import('../../components/RecommendedSongList.vue'),
    newsongs: () => import('../../components/NewSongList.vue'),
    rankinglist: () => import('../../components/RankingList.vue'),
    musiccalendar: () => import('../../components/MusicCalendar.vue'),
    drawer: () => import('../../components/Drawer.vue'),
  },

  methods: {
    toggleMenu(name) {
      this.activeMenuItem = name;
      this.fetchPlaylists(name);
    },
    showTitle(payload) {
      this.drawerVisible = !this.drawerVisible;
      this.show = payload;
    },
    closeDrawer() {
      // this.$emit('update:visible', false);
      this.drawerVisible = !this.drawerVisible;
    },
    clickHandler(e) {
      if (e.target === this.$refs.drawerMask) {
        // this.visible = false;
        // 使用vm.$emit给父组件传递数据
        this.closeDrawer();
      }
    },
  },
  created() {
    // 轮播图  新歌新碟\数字专辑 排行榜
    BlockPage().then((res) => {
      // console.log( this.banners);
      this.banners = res.data.data.blocks[0].extInfo.banners;
      this.newAlbum = res.data.data.blocks[5].creatives;
      // console.log(this.newAlbum);
      // console.log(res.data.data.blocks[3].creatives);
      this.blocks = res.data.data.blocks[3].creatives;
    });

    // 菜单
    DragonBall().then((res) => {
      this.menulist = res.data.data;
      // console.log(this.menulist);
    });

    //推荐歌单
    Personalized().then((res) => {
      this.personalized = res.data.result;
      // console.log(this.personalized);
    });

    // 音乐日历
    Calendar().then((res) => {
      console.log(res.data.data.calendarEvents);
      this.calendar = res.data.data.calendarEvents;
    });
  },
};
</script>

<style>
.bscroll-indicator {
  width: 10vw !important;
}
.red-image {
  filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='colorize'><feColorMatrix type='matrix' values='1 0 0 0 0.698 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter></svg>#colorize");
}
</style>
