import styled from 'styled-components-vue';
const Wrapper = styled.div`
  .van-sticky {
    background-color: #fff;
    /* z-index: 999; */
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
  }
  .van-tabs__nav {
    background-color: #f5f5f5;
    width: 53vw;
    margin: 0 auto;
  }
`;

import { Icon } from '@iconify/vue2';
import dayjs from 'dayjs';
import store from 'storejs';
import {
  getUserAccount,
  getUserDetail,
  fetchUserHistory,
  getUserShou,
  fetchUserPlaylist,
} from '../../request/index.js';

export default {
  render() {
    return (
      <Wrapper>
        <van-sticky>
          <div class=" mx-[3vw] flex items-center my-[3vw] text-[7vw] justify-between text-[#ccc] ">
            <Icon icon="majesticons:arrow-left" />
            <Icon icon="uim:ellipsis-v" />
          </div>
        </van-sticky>
        <div class=" relative bg-[#00ff00]">
          <img
            src={this.localStorage2.profile.backgroundUrl}
            alt=""
            class="w-[100vw] h-[62vw]"
          />
          <div class="px-2 absolute bottom-[7vw] right-[4vw] border-[1px] border-[#ccc] bg-black text-[#ffffff] rounded-2xl">
            TA的照片
          </div>
        </div>
        <div class=" bg-[#f5f5f5]">
          <div class=" absolute left-[42%] z-[99] top-[48vw]">
            <img
              src={this.localStorage2.profile.avatarUrl}
              alt=""
              class="w-[17vw] h-[17vw] rounded-[50%]"
            />
          </div>
          <div class="w-[90%] mx-auto bg-[#ffffff] rounded-xl relative top-[-4vw] overflow-hidden">
            <div class="my-[4vw] mx-auto  text-center">
              <div class="mt-[10vw]">{this.localStorage2.profile.nickname}</div>
              <div class="my-[4vw]">
                <ul class="flex items-center justify-center">
                  <li class=" px-2 border-r border-[#ccc] text-[#868686] text-[3.5vw]">
                    <span>{this.localStorage2.profile.follows}</span>
                    <span>关注</span>
                  </li>
                  <li class=" px-2 border-r border-[#ccc] text-[#868686] text-[3.5vw]">
                    <span>{this.localStorage2.profile.followeds}</span>
                    <span>粉丝</span>
                  </li>
                  <li class=" px-2 text-[#868686] text-[3.5vw] ">
                    <span>Lv.</span>
                    <span>{this.localStorage2.level}</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul class="flex items-center text-[2vw] justify-center">
                  <li class="px-[2vw] border rounded-xl border-[#ccc] ml-[3vw] ">
                    <span>IP:</span>
                    <span>湖北</span>
                  </li>
                  <li class="px-[2vw] border rounded-xl border-[#ccc] ml-2">
                    <span>00后</span>
                    <span>狮子座</span>
                  </li>
                  <li class="px-[2vw] border rounded-xl border-[#ccc] ml-[3vw]">
                    <span>湖北</span>
                    <span>武汉</span>
                  </li>
                </ul>
              </div>
              <div class="flex items-center my-[4vw] justify-center">
                <div
                  class="px-[4vw] border border-[#ccc] rounded-xl mx-[2vw]"
                  onClick={this.edit}
                >
                  编辑资料
                </div>
                <div
                  class="w-[7vw] h-[7vw] rounded-[50%] border border-[#ccc]"
                  onClick={this.change}
                >
                  {!this.visible && (
                    <Icon
                      icon="mingcute:down-line"
                      class="relative top-[1.5vw] right-[-1vw]"
                    />
                  )}
                  {this.visible && (
                    <Icon
                      icon="mingcute:up-line"
                      class="relative top-[1vw] right-[-1vw]"
                    />
                  )}
                </div>
              </div>
              {this.visible && <div>123</div>}
            </div>
          </div>

          <van-tabs>
            <van-tab title="主页">
              {/* 音乐品味开始 */}
              <div class=" w-[90%] mx-auto bg-[#fefefe] rounded-[15px] px-[4vw] pb-[4vw] pt-[5vw] mb-[4vw] mt-2">
                <p class="text-[#2a3146] font-semibold text-[5vw] mb-[2.4vw]">
                  音乐品味
                </p>
                <div class="flex ">
                  <div class="border-[2px] flex flex-wrap bg-[#f8e5e5] rounded-[3vw] h-[32vw] flex-1 p-[2vw] content-between">
                    <div class="w-[100%] text-[2.6vw] text-[#7e7f8b]">
                      我的喜欢
                      <p class="mt-[2.6vw] text-[#545969] text-[3.5vw] font-semibold">
                        {28}首
                      </p>
                    </div>
                    <div class="w-[100%] text-[2.6vw] text-[#7e7f8b] flex items-center">
                      <Icon
                        icon="ph:heart-fill"
                        color="#a9aab2"
                        class=" mr-[0.8vw] text-[2.6vw]"
                      />
                      喜欢的音乐
                    </div>
                  </div>
                  <div class="border-[2px] flex flex-wrap bg-[#f9eed5] rounded-[3vw] h-[32vw] flex-1 mx-[2vw] p-[2vw] content-between">
                    <div class="w-[100%] text-[2.6vw] text-[#7e7f8b]">
                      累计听歌
                      <p class="mt-[2.6vw] text-[#545969] text-[3.5vw] font-semibold">
                        {this.localStorage2.listenSongs}首
                      </p>
                    </div>
                    <div class="w-[100%] text-[2.6vw] text-[#7e7f8b] flex items-center ">
                      <Icon
                        icon="ri:rhythm-line"
                        color="#a9aab2"
                        class=" mr-[0.8vw] text-[2.6vw]"
                      />
                      听歌排行
                    </div>
                  </div>
                  <div class="border-[2px] flex flex-wrap bg-[#e5ecf6] rounded-[3vw] h-[32vw] flex-1 p-[2vw] content-between">
                    <div class="w-[100%] text-[2.6vw] text-[#7e7f8b]">
                      本周关键词
                      <p class="mt-[2.6vw] text-[#545969] text-[3.5vw] font-semibold">
                        属于你的音乐档案
                      </p>
                    </div>
                    <div class="w-[100%] text-[2.6vw] text-[#7e7f8b] flex items-center ">
                      <Icon
                        icon="fa-solid:hourglass"
                        color="#a9aab2"
                        class=" mr-[0.8vw] text-[2.6vw]"
                      />
                      黑胶时光机
                    </div>
                  </div>
                </div>
              </div>
              {/* 音乐品味结束 */}
              {/* 创建的歌单开始 */}
              <div class="w-[90%] mx-auto bg-[#ffffff] overflow-hidden rounded-[15px] mt-[5vw]">
                <div class="flex items-center ml-[5vw] mt-[6vw]">
                  <p class="text-[#2a3146] font-semibold text-[5vw]">
                    收藏的歌单
                  </p>
                  <span class="text-[#999]">({this.getcount.length})</span>
                </div>
                <ul class="py-2 ml-[5vw]">
                  {this.getcount.map((item) => (
                    <li
                      class="flex items-center mt-2"
                      onClick={() => this.playlist(item.id)}
                    >
                      <img
                        src={item.coverImgUrl}
                        class="w-[14vw] h-[14vw] rounded-[2vw]"
                      />
                      <div class="pl-[3vw] w-[68vw]">
                        <p class="text-[#333] line-clamp-1">{item.name}</p>
                        <p class="text-[3vw] text-[#808080]">
                          {item.trackCount}首，By {item.creator.nickname}
                          ，播放{parseInt(item.playCount / 10000)}万次
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* 创建的歌单结束 */}
              <div class="w-[90%] mx-auto bg-[#ffffff] overflow-hidden rounded-[15px] mt-[5vw] mb-[12vw]">
                <div class="flex items-center w-[85vw] justify-between mx-auto my-[5vw]">
                  <div class="text-[#808080]">基本信息</div>
                  <div class="px-[3vw] border border-[#ccc] rounded-xl flex items-center">
                    <img
                      src={this.localStorage2.profileVillageInfo.imageUrl}
                      alt=""
                      class="w-[4vw] h-[4vw]"
                    />
                    <p class="text-[3vw]">
                      {this.localStorage2.profileVillageInfo.title}
                    </p>
                  </div>
                </div>
                <div class="w-[85vw] mx-auto">
                  <span class="text-[#808080]">村龄:</span>
                  <span class="pl-2 text-[#808080]">
                    {Math.floor(this.localStorage2.createDays / 365)}年
                  </span>
                  <span class="text-[#808080]">
                    ({dayjs(this.localStorage2.createTime).format('YYYY年MM月')}
                    注册)
                  </span>
                </div>
                <div class="w-[85vw] mx-auto my-[5vw]">
                  <span class="text-[#808080]">性别:</span>
                  <span class="pl-2 text-[#808080]">
                    {this.localStorage2.profile.gender ? '男' : '女'}
                  </span>
                </div>
                <div class="my-[5vw] w-[85vw] mx-auto">
                  <span class="text-[#808080]">地区:</span>
                  <span class="pl-2 text-[#808080]">湖北</span>
                  <span class="pl-1 text-[#808080]">武汉</span>
                </div>
              </div>
            </van-tab>
            <van-tab title="动态">
              <p class="text-[4vw] text-[#b1b0b0] pt-[15vw] pl-[32vw]">
                暂时还没有动态哦
              </p>
            </van-tab>
            <van-tab title="博客"></van-tab>
          </van-tabs>
        </div>
        <router-view></router-view>
      </Wrapper>
    );
  },
  data() {
    return {
      localStorage: {},
      localStorage2: {},
      visible: false,
    };
  },
  methods: {
    change() {
      this.visible = !this.visible;
    },
    edit() {
      this.$router.push('/user/edit');
      // console.log(this.$router);
    },
    playlist(id) {
      this.$router.push({ path: '/song', query: { id } });
    },
  },
  async created() {
    this.localStorage2 = JSON.parse(localStorage.getItem('userDetail'));
    console.log(this.localStorage2);

    this.localStorage = store.get('collectplaylist');
    console.log(this.localStorage);

    getUserAccount().then((res) => {
      this.PersonalData = res.data.profile;
      console.log(this.PersonalData);
      getUserDetail(this.PersonalData.userId).then((res) => {
        //   this.PersonalData = res.data.profile;
        this.ShuZu = res.data;
        console.log(res);
        // console.log(this.ShuZu);
      });

      fetchUserHistory(this.PersonalData.userId).then((res) => {
        console.log(res);
      });

      getUserShou().then((res) => {
        console.log(res);
        this.ShuLing = res.data;
        // console.log(this.ShuLing);
      });
      console.log(this.PersonalData.userId);
      fetchUserPlaylist(this.PersonalData.userId).then((res) => {
        console.log(res);
        this.ShouChang = res.data.playlist;
        console.log(this.ShouChang);
        store.set('collectplaylist', res.data.playlist);
      });
    });
  },
  computed: {
    getcount() {
      return this.localStorage.filter((item) => {
        return item.subscribed == true;
      });
    },
  },
};
