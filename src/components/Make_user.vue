<!-- <script>
import axios from 'axios';
import { Navigation, Pagination, Scrollbar } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    user_list: {
      type: Array,
      default: []
    },
  },
  setup() {
    return {
      modules: [ Navigation, Pagination, Scrollbar ]
    }
  },
  data() {
    return {
      upload_ch: false,
      board_setting_ch: false,
      comment: "",
    }
  },
  methods: {
    board_setting() {
      this.board_setting_ch = !this.board_setting_ch;
    },
    async board_delete(idx) {
      // 함수마다 전부 async붙여서 비동기할 것들은 그 안은 try catch를 하난?
      // 삭제 확인 -> 동작은 하는데 커마 후에 사용하잔
      // if(confirm("게시물을 삭제할까요?") == true) {
      //   console.log('make_delte successfly')
      // } else {
      //   return;
      // }

      // key : value 하나로하면 똑같이 들어간단 -> 이름을 지정해주자 (보낼때 이름은 같더라도 받은곳에선 달라진단(데이터에 따라))
      const make_delete = await axios.post('http://localhost:8000/make_delete', { make_idx : idx });
      console.log(make_delete);
      // 서버에서 삭제작업후엔 적용될려면 새로고침이 필요하단 -> 딱히 해당부분만 할필욘없다 전체 새로고침하잔ㄴ 이럴땐
      this.$router.go();
    },
    board_close() {
      this.board_setting_ch = false;
    },
    msg_page() {
      // 일단 그냥 이동하고 유저와 매칭하는걸 찾아보잔ㄴ
      this.$router.push('/message');
    },
  },
  computed: {
    comment_ch() {
      if(this.comment !== "") {
        this.upload_ch = true;
      } else {
        this.upload_ch = false;
		  }
	  }
  },
  watch: {
    // watch는 선언만으로 되는게 신기하단
    comment_ch() {
    
    },
  },
}
</script>


<template>
  <div class="__board" v-for="user in user_list" :key="user">
    <div class="board__title">
      <div class="__myInfo">
        <div class="__infoBox">
          <div class="__myImg"></div>
          <div class="__myData">
            <div class="__nickname">{{ user.nickname }}</div>
            <div class="__name">{{ user.name }}</div>
          </div>
        </div>
        <!-- 이런식으로 부모요소와 클릭요소가 다를 경우 클릭요소에다 주는게 정확하단 -->
        <!-- 해당 드롭박스는 클릭부분위치로 아래에 만들면 좋단 position absolute로 만들거라 위치는 중요하지 않다 -> 하지만 해당 부모에 relative같은게 걸려있다면 가장 가까운 위치에 만들어란 (한칸 아래라던가) 반복문이거나 복잡한구조면 걍 빠져나와서 최대한 가까운곳에 만들잔 -->
        <div class="__transform"><i @click="board_setting()" class="fa-solid fa-ellipsis"></i></div>
      </div>
      <!-- board_setting -->
      <!-- 동적인 값이 아니라 고정값이라면 스타일로 고정으로 등록해도 상관없단ㄴㄴ ㄷ동적만 신경쓰자 -->
      <div class="board__setting" :class="{ board_setting_ch }">
        <div class="item" @click="board_delete(user.idx)">삭제</div>
        <div class="item">수정</div>
        <div class="item" @click="board_close()">취소</div>
      </div>
    </div>


    <div class="board__body">
      <!-- slider가 1나여도 2개로 설정하면 그만큼 줄어든단 -->
      <swiper class="swiper swiper-container" :slides-per-view="1" :space-between="20" :modules="modules" navigation  :pagination="{ clickable: true }">
        <div class="swiper-wrapper" v-if="user.img_cnt === 1">
          <swiper-slide>
            <img class="body__img" :src="user.img" />
          </swiper-slide>
        </div>
        <div class="swiper-wrapper" v-else>
          <swiper-slide v-for="img in user.img.split(',')" :key="img">
            <img class="body__img" :src="img" />
          </swiper-slide>
        </div>
      </swiper>
    </div>
    <div class="board__content">
      <!-- 이렇게 같은 item들을 flex로 할땐 동일하게 되지만 하나만 margin auto, 해당 자식만 flex를 또 걸어 하나만 따로 맨끝 이런식으로 지정해줄 수 있단 -->
      <div class="content__comu">
        <div class="__icons __heart"><i class="fa-regular fa-heart"></i></div>
        <div class="__icons __comment"><i class="fa-regular fa-comment"></i></div>
        <div class="__icons __message" @click="msg_page()"><i class="fa-regular fa-paper-plane"></i></div>
        <div class="__icons __save"><i class="fa-regular fa-bookmark"></i></div>
      </div>
      <div class="comment__info">
        <div class="info__title" v-if="user.make_write !== ''">{{ user.nickname }} <span>{{ user.make_write }}</span></div>
      </div>
      <div class="comment__date">
        <div class="date__title">1일 전</div>
      </div>
      <div class="comment__text">
        <div class="__icon"><i class="fa-regular fa-face-smile"></i></div>
        <div class="__text"><input v-model="comment" placeholder="댓글 달기..." /></div>
        <div class="__uploadBtn" :class="{ upload_ch }">게시</div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.__board {
  // min-height: 530px;
  max-height: 900px;
  // height: 100%;
  border-radius: 8px;
  margin-top: 16px;
  margin-bottom: 12px;
  background: rgb(255,255,255);
  border: 1px solid rgb(219, 219, 219);
  box-sizing: border-box;
  .board__title {
    max-height: 60px;
    min-height: 55px;
    // height: 100%;
    border-bottom: 1px solid rgb(219, 219, 219);
    .__myInfo {
      padding: 13px;
      display: flex;
      align-items: center;
      .__infoBox {
        display: flex;
        align-items: center;
        .__myImg {
          background: #eee;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
        }
        .__myData {
          margin-left: 15px;
          .__nickname {
            font-size: 14px;
            font-weight: bold;
            color: rgb(38, 38, 38);
          }
          .__name {
            margin-top: 5px;
            font-size: 12px;
            color: rgb(142, 142, 142);
          }
        }
      }
      .__transform {
        margin-left: auto;
        margin-right: 12px;
        font-size: 20px;
        color: #000;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
  .board__body {
    max-height: 590px;
    height:100%;
    // 사진이 디스플레이 맞게 height widthg 줄어든단 ->부모 자식 100프로맞춘다 부모는 min걸면 그만큼까지 줄어드니깐 참곤
    // min-height: 275px;
    // height: 100%;
    .swiper {
      height: auto;
      .swiper-slide {
        // height : 100%하면 안늘어나고 auto하니깐 늘어난단 -> 차이 기억하기
        height: auto;
        .body__img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .board__content {
    border-top: 1px solid rgb(219, 219, 219);
    max-height: 250px;
    // min-height: 200px;
    // height: 100%;
    // height: 100%;
    .content__comu {
      padding: 13px;
      display: flex;
      .__icons {
        cursor: pointer;
        i {
          font-size: 24px;
          // color, background-color론 icons안에 채울순없지만 font-weight : bold로 검은 백그라운드를 줄 수 있다
        }
        margin-left: 20px;
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-left: auto;
        }
        &:hover {
          opacity: .5;
        }
      }
    }
    .comment__heart {
      padding: 10px 10px 10px 15px;
      display: flex;
      align-items: center;
      .heart__img {
        width: 24px;
        height: 24px;
        background: #eee;
        border-radius: 50%; 
      }
      .heart__text {
        margin-left: 10px;
        font-size: 15px;
      }
    }
    .comment__info {
      padding: 5px 13px 5px 13px;
      .info__title {
        font-size: 14px;
        font-weight: bold;
        span {
          font-weight: 400;
          font-size: 13px;
        }
      }
    }
    .comment__date {
      padding: 13px;
      .date__title {
        font-size: 10px;
        color: #828282
      }
    }
    .comment__text {
      padding: 8px 16px;
      height: 100%;
      border-top: 1px solid rgb(219, 219, 219);
      display: flex;
      align-items: center;
      .__icon {
        // i icon은 직접 i에 안넣고 부모요소에 넣어도 적용된단
        font-size: 24px;
      }
      .__text {
        margin-left: 10px;
        input {
          width: 350px;
          height: 30px;
          border: none;
          outline: none;
        }
      }
      .__uploadBtn {
        opacity: .3;
        // cursor: pointer;
        margin-left: auto;
      }
      .__uploadBtn.upload_ch {
        opacity: 1;
        cursor: pointer;
        color: rgb(0, 149, 246);
      }
    }
  }
  .sma {
    cursor: pointer;
  }
  .board__setting {
    display: none;
    position: absolute;
    width: 400px;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
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
        &:hover {
          border-radius: 0 0 10px 10px;
        }
      }
      &:first-child {
        border-top: none;
        &:hover {
          background: rgb(250, 250, 250);
          border-radius: 10px 10px 0 0;
        }
      }
      &:hover {
        background: rgb(250, 250, 250);
      }
    }
  }
  .board__setting.board_setting_ch {
    display: block;
    animation: fadeInUp 1s;
    @keyframes fadeInUp {
      0% {
        opacity: 0;
        // translate(x, y)
        transform: translate(-50%, -45%);
  
      }
      100% {
        opacity: 1;
        transform: translate(-50%, -50%);
      }
    }
  }
}



@media screen and (max-width: 735px) {
  .__board {
    .board__setting {
      width: 260px;
    }
  }
}
</style> -->