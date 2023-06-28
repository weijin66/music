// 所有的请求都定义在这个位置
import axios from 'axios';
const http = axios.create({
  baseURL: 'https://netease-cloud-music-api-five-roan-88.vercel.app',
});
// 轮播图 新歌新碟\数字专辑 排行榜
export const BlockPage = () => http.get('/homepage/block/page');

// 每日推荐
export const DragonBall = () => http.get('/homepage/dragon/ball');

// 推荐歌单
export const Personalized = () => http.get('/personalized?limit=6');

// 音乐日历
export const Calendar = () =>
  http.get('/calendar?startTime=1677417600000&endTime=1677417600000');
