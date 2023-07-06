// 所有的请求都定义在这个位置
import axios from 'axios';
import store from 'storejs';
const http = axios.create({
  baseURL: 'https://netease-cloud-music-api-five-roan-88.vercel.app',
});
//添加请求拦截器
http.interceptors.request.use(function (config) {
  const cookie = store.get('__m__cookie') ?? '';
  config.params = config.params || {};
  config.params.cookie = cookie;
  return config;
});

// 轮播图 新歌新碟\数字专辑 排行榜 推荐歌单
export const BlockPage = () => http.get('/homepage/block/page');

// 每日推荐
export const DragonBall = () => http.get('/homepage/dragon/ball');

// 音乐日历
let nowDate = new Date();
let start = new Date(
  `${nowDate.getFullYear()}-${
    nowDate.getMonth() + 1
  }-${nowDate.getDate()} 00:00:00`
);
let end = new Date(
  `${nowDate.getFullYear()}-${
    nowDate.getMonth() + 1
  }-${nowDate.getDate()} 23:59:59`
);
export const Calendar = () =>
  http.get(`/calendar?startTime=${start.getTime()}&endTime=${end.getTime()}`);

// 获取默认搜索关键词
/**
 * @description 获取默认搜索关键字
 * @parm {Array} xxx
 * @returns  {Promise} xxx
 */
export const fetchSearchDefault = () => http.get('/search/default');

export const fetchSearchResult = (params) =>
  http.get('/cloudsearch', { params });

export async function playlist() {
  //获取所有个歌单的id
  const res = await http.get('/toplist/detail');
  //通过id获取歌曲
  const playlist = await Promise.all(
    res.data.list.map(({ id }) =>
      http.get('/playlist/detail', { params: { id } })
    )
  );
  console.log(playlist.map((item) => item.data.playlist));
  return playlist.map((item) => item.data.playlist);
}

// 歌单详情
export const songDetail = (params) => http.get(`/playlist/detail?id=${params}`);
// 所有歌曲
export const songAll = (params) => http.get(`/playlist/track/all?id=${params}`);

export const getQRKey = () => http.get('/login/qr/key');
export const getQrInfo = (key, qrimg = 1) =>
  http.get('/login/qr/create', { params: { key, qrimg } });

export const checkQrStatus = (key) =>
  http.get('/login/qr/check', { params: { key, timestamp: Date.now() } });
