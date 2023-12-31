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

export const loginStatus = () => http.get('/login/status');
export const getUserAccount = () => http.get('/user/account');
export const getUserDetail = (uid) =>
  http.get('/user/detail', { params: { uid } });

// 用户详情页面
export const getUserShou = () => http.get('/user/subcount');

/**
 * @descriptiong 获取用户评论
 */
export const fetchUserHistory = (uid) =>
  http.get('/user/comment/history', { params: { uid } });

/**
 * @descriptiong 获取用户歌单
 */
// 收藏歌单加我的评论
export const fetchUserPlaylist = (uid) =>
  http.get('/user/playlist', { params: { uid } });

/**
 * @descriptiong 播放歌曲
 */

// 播放歌曲
export const getTrackDetail = (id) =>
  http.get('/song/detail', { params: { ids: id } });
export const getMP3 = (id) =>
  http.get('/song/url/v1', { params: { id, level: 'standard' } });

//修改昵称
export const fetchUserUpdata = (nickname) =>
  http.get('/user/update', { params: { nickname } });
//昵称修改判断是否重复
export const featNicknameCheck = (nickname) =>
  http.get('/nickname/check', { params: { nickname } });

/**
 * @descriptiong MV排行
 */

// MV排行
export const MvList = (area) =>
  http.get('/top/mv', { params: { limit: 50, area } });

/**
 * @descriptiong 获取歌词
 */

// 获取歌词
export const getLyric = (id) => http.get('/lyric', { params: { id } });

/**
 * @description MV视频
 */
export const featMvUrl = (id) => http.get('/mv/url', { params: { id } });

/**
 * @description MV视频信息
 */
export const featMvDetail = (mvid) =>
  http.get('/mv/detail', { params: { mvid } });

/**
 * @description 获取 mv 点赞转发评论数数据
 */
export const featMvDetailInfo = (mvid) =>
  http.get('/mv/detail/info', { params: { mvid } });

/**
 * @description MV评论
 */
// 评论
export const featMvComment = (id) =>
  http.get('/comment/mv', { params: { id } });
