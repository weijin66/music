<template>
  <div class="w-[100vw] overflow-hidden bg-purple-100">
    <!-- 搜索框 -->
    <search></search>
    <!-- 轮播图 -->
    <swipe :banners="banners"></swipe>
    <!-- 菜单部分 -->
    <menulist :menulist="menulist"></menulist>
    <!-- 推荐歌单 -->
    <recommendedsonglist :personalized="personalized"></recommendedsonglist>
    <!-- 新歌新碟\数字专辑 -->
    <newsongs :newAlbum="newAlbum" resources="resources"></newsongs>
    <!-- 排行榜 -->
    <rankinglist :blocks="blocks"></rankinglist>
    <!-- 音乐日历 -->
    <musiccalendar :calendar="calendar"></musiccalendar>
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
  },

  methods: {
    toggleMenu(name) {
      this.activeMenuItem = name;
      this.fetchPlaylists(name);
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
