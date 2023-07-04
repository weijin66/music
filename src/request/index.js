// 所有的请求都定义在这个位置
import axios from 'axios';
const http = axios.create({
  baseURL: 'https://netease-cloud-music-api-five-roan-88.vercel.app',
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
