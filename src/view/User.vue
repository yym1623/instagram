<script>
import { Navigation, Pagination, Scrollbar } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import axios from 'axios';

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [ Navigation, Pagination, Scrollbar ],
    }
  },
  data() {
    return {
      nickname: this.$route.params.id,
      name: this.$route.params.name,
    
      boar_ch: true,
      play_ch: false,
      save_ch: false,
      tag_ch: false,

      setting_ch: false,

      user_list: []
    }
  },
  methods: {
    // 4개의 버튼에 대해선 하나로 컨트롤 못하고 각각 해줘야 하나보단 -> 하나로 어떻게 컨트롤할거지? 하나가 트루되면 건것들 전부 트루될텐데? 또 하나되면 나머진 꺼줘야 하는데 하나로 어캐함
    boarBtn() {
      this.boar_ch = true;
      this.play_ch = false;
      this.save_ch = false;
      this.tag_ch = false;
    },
    playBtn() {
      this.boar_ch = false;
      this.play_ch = true;
      this.save_ch = false;
      this.tag_ch = false;
    },
    saveBtn() {
      this.boar_ch = false;
      this.play_ch = false;
      this.save_ch = true;
      this.tag_ch = false;
    },
    tagBtn() {
      this.boar_ch = false;
      this.play_ch = false;
      this.save_ch = false;
      this.tag_ch = true;
    },
    settingBtn() {
      this.setting_ch = !this.setting_ch;
    }
  },
  async mounted() {
    const email = this.$cookies.get('email');

    // 주소안에 변수넣을게 아니라면 ``말고 ''로 쓰잔
    // aixos.post로 줄여서 두번째인자로 데이터주니깐 데이터가 안온다 객체로 data로 주니깐 간다 -> 대체모냔 -> 알아보잔axioss
    const res = await axios({
      url: 'http://localhost:8000/user_make_select',
      method: 'POST',
      data: { email }
    })
    console.log(res);
    this.user_list = res.data;
  }
}
</script>

<template>
  <div class="user">
    <div class="inner">
      <div class="__userBox">
        <div class="__userImg">
          <div class="__userLogo"></div>
        </div>
        <div class="__userInfo">
          <div class="__info">
            <div class="__nickname">{{ nickname }}</div>
            <button class="__change">프로필 편집</button>
            <div class="__setting" @click="settingBtn()"><i class="fa-solid fa-gear"></i></div>
          </div>
          <!-- setting box -->
          <div class="setting" :class="{ setting_ch }">
            <div class="item">비밀번호 변경</div>
            <div class="item">QR 코드</div>
            <div class="item">앱 및 웹사이트</div>
            <div class="item">알림</div>
            <div class="item">개인정보 및 보안</div>
            <div class="item">관리 감독</div>
            <div class="item">로그인 활동</div>
            <div class="item">instagram에서 보낸 이메일</div>
            <div class="item">문제 신고</div>
            <div class="item">퍼가기</div>
            <div class="item">로그아웃</div>
            <div class="item">취소</div>
          </div>

          <div class="__data">
            <div class="bn myN">게시물</div>
            <div class="bf myN">팔로워</div>
            <div class="bfw myN">팔로우</div>
          </div>
          <div class="__name">{{ name }}</div>
        </div>
      </div>
      <div class="__highright">
        <!-- 여러 컴포넌트에 windth 넓이 구하는게 여러개있으면 중첩이되어 오류가 걸린다 -> 이럴때 pinia, vuex같은 상태관리에 하나로 작성하고 필요한 컴포넌트 여러군대서 불러와서 쓰기만 하면 된단 -->
        <swiper class="swiper swiper-container" :slides-per-view="6"  scrollbar :space-between="10" :modules="modules">
          <swiper-slide class="swiper__item">
            <div class="__img"><i class="fa-solid fa-plus"></i></div>
            <div class="__nickname">신규</div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="__itemMenu">
        <div class="__menus __itemText" :class="{ boar_ch }" @click="boarBtn()">
          <div class="__icon">
            <i class="fa-solid fa-chess-board"></i>
          </div>
          <div class="__text">게시물</div>
        </div>
        <div class="__menus __itemMovie" :class="{ play_ch }" @click="playBtn()">
          <div class="__icon">
            <i class="fa-solid fa-clapperboard"></i>
          </div>
          <div class="__text">릴스</div>
        </div>
        <div class="__menus __itemSave" :class="{ save_ch }" @click="saveBtn()">
          <div class="__icon">
            <i class="fa-regular fa-bookmark"></i>
          </div>
          <div class="__text">저장됨</div>
        </div>
        <div class="__menus __itemTag" :class="{ tag_ch }" @click="tagBtn()">
          <div class="__icon">
            <i class="fa-solid fa-user"></i>
          </div>
          <div class="__text">태그됨</div>
        </div>
      </div>
      <div class="__data">
        <!-- 부모에서 반복쓰면 부모전체가 반복된다 아이템에다가 해야한다 -> 잘 구분해서 쓰잔(순서) -->
        <div class="gd">
          <!-- test (9) -->
          <!-- v-for 반복문키는 아이템 전체를 줘도되지만 아이템안에 이름으로 구별해줘도 좋단 -->
          <div class="__item" v-for="user_item in user_list" :key="user_item">
            <img :src="user_item.img" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user {
  width: calc(100% - 335px);
  // 처음 예시로 정할때만 사용 -> 값이 늘어나서 해당값을 초과하면 디자인이 꺠진단 - min이면 상관없다
  min-height: 100vh;
  margin-left: auto;
  background: rgb(250, 250, 250);
  padding: 30px 20px 20px 20px;
  box-sizing: border-box;
  .inner {
    width: 100%;
    max-width: 935px;
    // height: 100%;
    // test
    // min-height: 100vh;
    // background: blue;
    margin: auto;
    .__userBox {
      display: flex;
      // align-items: center;
      margin-bottom: 40px;
      .__userImg {
        width: 40%;
        display: flex;
        justify-content: center;
        .__userLogo {
          width: 150px;
          height: 150px;
          background: rgb(219,219,219);
          border-radius: 50%;
          cursor: pointer;
        }
      }
      .__userInfo {
        width: 60%;
        margin-left: 30px;
        .__info {
          display: flex;
          color: #262626;
          .__nickname {
            font-size: 28px;
            font-weight: 100;
          }
          .__change {
            cursor: pointer;
            padding: 5px 9px;
            margin-left: 20px;
            background: transparent;
            border: 1px solid rgb(219, 219, 219);
            border-radius: 4px;
            font-weight: bold;
            color: rgb(38, 38, 38);
            &:active {
              opacity: .8;
            }
          }
          .__setting {
            // icon -> font-size -> img width랑 같단
            font-size: 28px;
            margin-lefT: 15px;
            cursor: pointer;
          }
        }
        .setting {
          display: none;
          position: absolute;
          width: 400px;
          top: 50%;
          // left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          // text-align: center;
          background: #fff;
          border-radius: 10px;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
          box-sizing: border-box;
          .item {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 48px;
            border-bottom: 1px solid #eee;
            box-sizing: border-box;
            color: #262626;
            font-size: 14px;
            cursor: pointer;
            &:last-child {
              border-bottom: none;
            }
          }
        }
        .setting.setting_ch {
          display: block;
        }
        .__data {
          margin-top: 30px;
          display: flex;
          align-items: center;
          .myN {
            margin-right: 50px;
            &:last-child {
              margin-right: 0;
            }
          }
        }
        .__name {
          margin-top: 30px;
          font-weight: bold;
        }
      }
    }
    .__highright {
      height: 130px;
      margin-bottom: 44px;
      padding-left: 50px;
      .swiper {
        .swiper__item {
          cursor: pointer;
          .__img {
            display: flex;
            justify-content: center;
            align-items: center;
            background: #eee;
            width: 77px;
            height: 77px ;
            border-radius: 50%;
            margin: auto;
            font-size: 30px;
            color: rgb(199, 199, 199);
          }
          .__nickname {
            font-size: 12px;
            color: #262626;
            margin-top: 5px;
            text-align: center;
          }
        }
      }
    }
    .__itemMenu {
      border-top: 1px solid rgb(219, 219, 219);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      .__menus {
        display: flex;
        height: 100%;
        align-items: center;
        padding-left: 30px; 
        padding-right: 30px;
        font-size: 12px;
        color: #828282;
        cursor: pointer;
        &:last-child {
          margin-right: 0;
        }
        .__icon {
          margin-right: 5px;
        }
      }
      .__menus.boar_ch {
        font-weight: bold;
        color: #000;
        border-top: 1px solid #000;
      }
      .__menus.play_ch {
        font-weight: bold;
        color: #000;
        border-top: 1px solid #000;
        
      }
      .__menus.save_ch {
        font-weight: bold;
        color: #000;
        border-top: 1px solid #000;
        
      }
      .__menus.tag_ch {
        font-weight: bold;
        color: #000;
        border-top: 1px solid #000;
      }
    }
    .__data {
      .gd {
        display: grid;
        gap: 30px;
        height: 100%;
        grid-template-columns: repeat(3, 1fr);
        .__item {
          // max로 지정하고 100%로 두단계로주면 max까지 100%늘어나는게 아닌가? -> 맞다 그런데 상위부모에 지정된 height만큼 현 요소 부모에다 height 100%든 뭐든 할당을해야 그 자식요소가 그만큼 잡을 수 있단
          max-width: 295px;
          max-height: 295px;
          width: 100%;
          aspect-ratio: 1 / 1; // 정사각형? 유지할때 좋단 -> 근데 유지만되고 반응성(디스플레이에 맞게 줄어드는 거)이 없는거 같다 -> 일단 보류
          height: auto;
          background: #fff;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          img {
            width: 100%;
            // height: 100%;
          }
        }
      }
    }
  }
}

// pc 2 ->>
@media screen and (max-width: 1700px) {
  .user {
    width: calc(100% - 245px);
  }
}

  // tablet - 1024, mobile - 760이 평균인데 instagram에 맞춰서 tablet - 1250, mobile - 760으로 해본다 (페이지마다 조금씩 차이가 있단)
  // tablet
@media screen and (max-width: 1200px) {
  .user {
    width: calc(100% - 72px);
  }
}

// tablet2 ->>
@media screen and (max-width: 999px) {
  .user {
    width: calc(100% - 72px);
  }
}

// mobile
@media screen and (max-width: 760px) {
  .user {
    width: 100%;
    margin: auto;
    margin-bottom: 50px;
    .inner {
      .gd {
        display: grid;
        gap: 10px;
        height: 100%;
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
}

// mobile2 ->>
@media screen and (max-width: 735px) {
  .user {
    width: 100%;
    margin: auto;
    padding: 0;
    margin-bottom: 50px;
    .inner {
      .__userBox {
        margin: 16px 16px 24px;
        .__userImg {
          width: auto;
          height: 77px;
          .__userLogo {
            width: 77px;
            height: 77px;
          }
        }
        .__userInfo {
          .__info {
            display: block;
            .__change {
              margin-top: 20px;
              margin-left: 0;
              max-width: 200px;
              width: 100%;
            }
            .__setting {
              display: none;
            }
          }
          .__name {
            display: none;
          }
          .__data {
            display: none;
          }
          .setting {
            width: 260px;
          }
        }
      }
      .__data {
        .gd {
          display: grid;
          gap: 10px;
          height: 100%;
          grid-template-columns: repeat(3, 1fr);
        }
      }
      .__highright {
        padding-left: 0;
        margin: 16px 0 24px 16px;
        .swiper {
          .swiper__item {
            .__img {
              width: 64px;
              height: 64px;
            }
          }
        }
      }
      .__itemMenu {
        display: flex;
        justify-content: center;
        // justify-content: space-around;
        .__menus {
          padding-left: 0;
          padding-right: 0;
          flex: 1 1 auto;
          justify-content: center;
          .__icon {
            font-size: 24px;
          }
          .__text {
            display: none;
          }
        }
        .__menus.boar_ch {
          color: rgb(0, 149, 246);
          border-top: 1px solid rgb(0, 149, 246);
        }
        .__menus.play_ch {
          color: rgb(0, 149, 246);
          border-top: 1px solid rgb(0, 149, 246);
        }
        .__menus.save_ch {
          color: rgb(0, 149, 246);
          border-top: 1px solid rgb(0, 149, 246);
        }
        .__menus.tag_ch {
          color: rgb(0, 149, 246);
          border-top: 1px solid rgb(0, 149, 246);
        }
      }
    }
  }
}

// mobile3 ->>
@media screen and (max-width: 660px) {
  .user {
    width: 100%;
    margin-bottom: 50px;
    .inner {
      width: 100%;
      margin: auto;
    }
  }
}
</style>