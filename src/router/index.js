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
    redirect: '/home',
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
];

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

export default router;
