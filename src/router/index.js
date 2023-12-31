import Vue from 'vue';
import VueRouter from 'vue-router';

import HomeView from '../views/HomeView/HomeView.vue';
import IndexView from '../../src/index.vue';
import SearchView from '../views/SearchView/SearchView.vue';
import SingerView from '../views/SingerView/SingerView.vue';
import GenreView from '../views/GenreView/GenreView.vue';
import ZoneView from '../views/ZoneView/ZoneView.vue';
import SongDetailView from '../views/SongDetailView/SongDetailView.vue';
import LoginView from '../views/LoginView/LoginView.vue';

const routes = [
  // 路径重定向
  {
    path: '/',
    redirect: '/login',
  },
  // 首页
  {
    path: '/home',
    component: HomeView,
  },
  // 歌单广场
  {
    path: '/index',
    component: IndexView,
  },
  //搜索页面
  {
    path: '/search',
    component: SearchView,
  },
  // 歌手
  {
    path: '/singer',
    component: SingerView,
  },
  // 曲风
  {
    path: '/genre',
    component: GenreView,
  },
  //专区
  {
    path: '/zone',
    component: ZoneView,
  },
  // 歌单详情
  {
    path: '/song',
    component: SongDetailView,
  },
  // 登录页面
  {
    path: '/login',
    component: LoginView,
  },

  // myMsgJSX
  {
    path: '/myMsg',
    component: () =>
      import(/*webpackChunkName:'jsx'*/ '../views/myMsgView/myMsg.jsx'),
  },
  // editJSX
  {
    path: '/user/edit',
    component: () =>
      import(/*webpackChunkName:'jsx'*/ '../views/editView/edit.jsx'),
  },
  // 音乐播放器
  {
    path: '/musicplayer',
    component: () => import('../views/MusicPlayerView/MusicPlayerView.vue'),
  },
  // MV排行榜
  {
    path: '/mv',
    component: () => import('../views/MVView/MVView.vue'),
  },
  // 播放mv页面路由
  {
    path: '/playvideo',
    name: 'playvideo',
    component: () => import('../views/VideoPlayerView/VideoPlayerView.vue'),
  },
];

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

export default router;
