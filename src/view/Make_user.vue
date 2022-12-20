<script>
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
    }
  },
  setup() {
    return {
      modules: [ Navigation, Pagination, Scrollbar ]
    }
  },
  data() {
    return {
      upload_ch: false
    }
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
    comment_ch() {
      
    }
  }
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
      <div class="__transform"><i class="fa-solid fa-ellipsis"></i></div>
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
    <div class="content__comu">
      <div class="__icons __heart"><i class="fa-regular fa-heart"></i></div>
      <div class="__icons __comment"><i class="fa-regular fa-comment"></i></div>
      <div class="__icons __message"><i class="fa-regular fa-paper-plane"></i></div>
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
      <div class="__text"><input v-model="comment" type="text" placeholder="댓글 달기..." /></div>
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
}
</style>