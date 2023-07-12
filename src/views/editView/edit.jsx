import styled from 'styled-components-vue';
import { areaList } from '@vant/area-data';
const Wrapper = styled.div`
  background-color: #f5f5f5;
  .van-cell {
    width: 96vw !important;
  }
  /* height: 100vh; */
`;
import { fetchUserUpdata, featNicknameCheck } from '../../request/index.js';
import _ from 'lodash';
export default {
  render() {
    return (
      <Wrapper>
        <div>
          <div class="h-[20vw] bg-[#fff] flex items-center pl-4">
            <Icon
              icon="ph:arrow-left-bold"
              width="6vw"
              height="6vw"
              nativeOnClick={this.home}
            />
            <p class="text-[5vw] text-[#333] ml-4 ">我的资料</p>
          </div>
        </div>
        {/* 卡片1 */}
        <van-cell-group class="mt-[2vw]">
          <van-cell
            title="头像"
            size="large"
            class=" text-[#333333] text-[3.6vw]  flex items-center w-[96vw] ml-[4vw] p-0 h-[14vw]"
          >
            <img
              src={this.localStorage3.profile.avatarUrl}
              alt=""
              class="w-[12vw] h-[12vw] rounded-[50%] float-right"
            />
          </van-cell>
          <van-cell
            title="昵称"
            onClick={() => (this.showview = !this.showview)}
            size="large"
            class=" text-[#333333] text-[3.6vw]  flex items-center w-[96vw] ml-[4vw] p-0 h-[14vw] pr-[4vw]"
          >
            <p class="float-right">{this.localStorage3.profile.nickname}</p>
          </van-cell>
          <van-cell
            title="性别"
            onClick={() => (this.genderBoolean = !this.genderBoolean)}
            value={this.genderList[this.gender]}
            size="large"
            class=" text-[#333333] text-[3.6vw]  flex items-center w-[96vw] ml-[4vw] p-0 h-[14vw] "
          >
            {/* <p class="float-right  mr-[4vw]">
              {this.localStorage3.profile.gender ? '男' : '女'}
            </p> */}
          </van-cell>
          <van-cell
            title="二维码"
            size="large"
            class=" text-[#333333] text-[3.6vw]  flex items-center w-[96vw] ml-[4vw] p-0 h-[14vw]"
          >
            <Icon icon="ph:qr-code-thin" class="text-[4.8vw] float-right" />
          </van-cell>
        </van-cell-group>
        {/* 卡片2 */}
        <van-cell-group class="mt-[2vw]">
          <van-cell
            title="生日"
            size="large"
            class=" text-[#333333] text-[3.6vw]  flex items-center w-[96vw] ml-[4vw] p-0 h-[14vw] pr-[4vw]"
          >
            <p class=" float-right">
              {this.TimestampConversion(this.localStorage3.profile.birthday)}
            </p>
          </van-cell>
          <van-cell
            title="地区"
            size="large"
            value={this.city}
            onClick={() => (this.popupVisible = !this.popupVisible)}
            class=" text-[#333333] text-[3.6vw]  flex items-center w-[96vw] ml-[4vw] p-0 h-[14vw] pr-[4vw]"
          ></van-cell>
          <van-cell
            title="大学"
            size="large"
            class=" text-[#333333] text-[3.6vw]  flex items-center w-[96vw] ml-[4vw] p-0 h-[14vw] pr-[4vw]"
          >
            <p class=" float-right">未填写</p>
          </van-cell>
          <van-cell
            title="音乐标签"
            size="large"
            class=" text-[#333333] text-[3.6vw]  flex items-center w-[96vw] ml-[4vw] p-0 h-[14vw] pr-[4vw]"
          >
            <p class=" float-right">选择标签</p>
          </van-cell>
          <van-cell
            title="简介"
            size="large"
            class=" text-[#333333] text-[3.6vw]  flex items-center w-[96vw] ml-[4vw] p-0 h-[14vw] pr-[4vw]"
          >
            <p class=" float-right">还没有简介</p>
          </van-cell>
        </van-cell-group>

        <van-cell-group class="mt-[2vw]">
          <van-cell
            title="个人主页隐私设置"
            size="large"
            class=" text-[#333333] text-[3.6vw] flex items-center w-[96vw] ml-[4vw] p-0 h-[14vw] pr-[4vw]"
          />
          <van-cell
            title="主页模块顺序设置"
            size="large"
            class=" text-[#333333] text-[3.6vw] flex items-center w-[96vw] ml-[4vw] p-0 h-[14vw] pr-[4vw]"
          />
        </van-cell-group>

        <van-cell-group class="mt-[2vw] mb-[20vw]">
          <van-cell
            title="账号和绑定设置"
            size="large"
            class=" text-[#333333] text-[3.6vw] flex items-center w-[96vw] ml-[4vw] p-0 h-[14vw] pr-[4vw]"
          />
        </van-cell-group>

        {/* 昵称 */}
        <van-popup
          v-model={this.showview}
          position="bottom"
          style={{ height: '100%' }}
        >
          <div class="flex justify-between w-[100%]  items-center h-[14vw] bg-[#FFFFFF] pl-[4vw] text-[3.5vw] pr-[4vw]">
            <div class="flex items-center">
              <Icon
                icon="simple-line-icons:arrow-left"
                class=" mr-[4vw] text-[4vw] text-[#333333]"
                nativeOnClick={() => {
                  this.showview = false;
                }}
              />
              <div class="flex items-center justify-center text-[#2a3146]  text-[4.2vw] font-[600]">
                修改昵称
              </div>
            </div>
            <div>
              <p
                class={[
                  'text-[3.8vw]',
                  'float-right',
                  'font-semibold',
                  this.duplicated ? 'text-[#ccc]' : 'text-[#000]',
                ]}
                onClick={this.NicknameID}
              >
                完成
              </p>
            </div>
          </div>
          <div class="mt-[2.7vw] h-[11.2vw] ">
            <input
              class="pl-[1.5vw] h-[11.2vw] w-[96vw] border-b-[1px] border-[#D9D9D9] ml-[4vw]"
              type="text"
              placeholder="请输入昵称"
              v-model={this.nicknameview}
            />
            {this.duplicated ? (
              <div class="h-[11vw] flex items-center text-[3.1vw] text-[#FE3C3A] pl-[4vw]">
                {this.errors}
              </div>
            ) : (
              <div></div>
            )}
            <div class="pl-[4vw]">
              {this.duplicated ? (
                <div class="px-[3.2vw] py-[2.5vw] rounded-[200px] bg-[#F3F3F3] text-[3vw] tetx-[#313131] inline-block">
                  {this.repeatNicname}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </van-popup>

        {/*性别*/}
        <van-popup
          v-model={this.genderBoolean}
          position="bottom"
          style={{ height: '30%' }}
        >
          <van-picker
            show-toolbar
            columns={this.genderList}
            default-index={this.localStorage3.profile.gender}
            onConfirm={this.genderConfirm}
            onCancel={() => (this.genderBoolean = false)}
            confirm-button-text="完成"
            cancel-button-text="取消"
          />
        </van-popup>

        {/* 地区 */}
        <van-popup
          v-model={this.popupVisible}
          position="bottom"
          style={{ height: '40%' }}
        >
          <van-area
            columns-num="2"
            confirm-button-text="完成"
            area-list={areaList}
            value={this.city[1]}
            onConfirm={this.confirm}
          />
        </van-popup>
      </Wrapper>
    );
  },
  data() {
    return {
      localStorage3: {},
      popupVisible: false,
      city: '',
      genderBoolean: false, //性别弹出框
      genderList: ['保密', '男', '女'], //性别数组
      gender: 0, //性别下标

      showview: false, //昵称显示隐藏
      nicknameview: null, //value值
      repeatNicname: null, //昵称重复的推荐昵称
      duplicated: false, //判断昵称是否重复
      errors: '昵称已经被注册，请选择下列名称',
    };
  },
  methods: {
    confirm(e) {
      this.popupVisible = false;
      this.city = e[0].name + e[1].name;
    },
    //时间
    TimestampConversion(timeStamp) {
      const date = new Date(timeStamp);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // 注意月份从 0 开始，需要加 1
      const day = date.getDate();
      return `${year}-${month}-${day}`;
    },
    //性别函数
    genderConfirm(e) {
      this.genderBoolean = false;
      this.gender = this.genderList.indexOf(e); // 查找对应性别 获取对应的下标
    },
    //昵称
    async NicknameID() {
      console.log(55);
      if (this.duplicated) {
        await fetchUserUpdata(this.nicknameview);
        this.showview = !this.showview;
      }
    },
    // 返回首页
    home() {
      this.$router.push('/home');
    },
  },
  created() {
    this.localStorage3 = JSON.parse(localStorage.getItem('userDetail'));
    console.log(this.localStorage3);
    this.nicknameview = this.localStorage3.profile.nickname;
  },
  watch: {
    nicknameview: _.debounce(async function (newValue) {
      const res = await featNicknameCheck(newValue);
      console.log(res);
      if (res.data.code === 400) {
        this.errors = res.data.message;
        this.duplicated = true;
      }
      if (res.data.duplicated) {
        this.errors = '';
        this.repeatNicname = res.data.candidateNicknames[0];
        this.duplicated = res.data.duplicated;
      }
    }, 300),
  },
};
