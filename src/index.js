import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import Player from './components/MusicPlayer/player';
Vue.use(Player);
import './index.css';
import { Icon } from '@iconify/vue2';
Vue.component('Icon', Icon);
// import indexView from './index.vue';
// import HomeView from './views/HomeView/HomeView.vue';
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import dayjs from 'dayjs';
Vue.prototype.dayjs = dayjs;

// 进度条插件
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

Vue.component('VueSlider', VueSlider);

//页面打开，请求自动发送
// 请求回来的数据还要渲染到页面上 （数据驱动视图的框架）
// 数据驱动试图变化的条件：数据必须是响应式的数据（data） + 数据必须通过模板语法绑定到模板中
// vue中this的指向问题：methods中所有函数(不要箭头函数)的this指向vm(vue的实例)

new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
});

// console.log(vm);
// 以_开头的变量名属性名是私有变量或属性，不希望他人使用
// 一般情况下：我们在实例化vue传递的配置项a ===> $a
// el ===> $el
// data ==> $data
// this.msg === this.$data.msg  对象属性代理

// var promise = fetch('https://netease-cloud-music-api-five-roan-88.vercel.app/top/playlist?cat=华语')
// .then(function(response) {
//     //response.status表示响应的http状态码
//     if(response.status === 200){
//       //json是返回的response提供的一个方法,会把返回的json字符串反序列化成对象,也被包装成一个Promise了
//       return response.json();
//     }else{
//       return {}
//     }

//  });
//  promise = promise.then(function(data){
//     //响应的内容
//       console.log(data.playlists);
//   }).catch(function(err){
//       console.log(err);
//   })
