<script>
import { Navigation, Pagination, Scrollbar } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import axios from 'axios'


import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'


export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  // setup() -> 처음 접속시의 라이프사이클인 mounted()같은거인거 같다
  setup() {
    return {
      modules: [ Navigation, Pagination, Scrollbar ]
    }
  },
  data() {
    return {
      user_id: this.$cookies.get('idx'),
      nickname: this.$cookies.get('nickname'),
      name: this.$cookies.get('name'),
      user_list: [],
      users_list: [],
      comment: "",
      make_idx: "",
      commentLength: 0,

      upload_ch: false,
      board_setting_ch: false,
    }
  },
  methods: {
    myPage(name) {
      console.log(name)
      this.$router.push({
        name: 'User',
        params: {
          id : name
        }
      })
    },
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
      const make_delete = await axios.post(import.meta.env.VITE_FULL_DB_URL + '/make_delete', { make_idx : idx });
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
    async comment_btn(idx) {
      // 값없으면 클릭못하는데 여기서 이중체크할 필욘없단
      const comment = await axios.post(import.meta.env.VITE_FULL_DB_URL + '/make_comment', { idx : idx, comment: this.comment, nickname : this.nickname, user_id : this.user_id });
      console.log(comment)
      this.$router.go();
    },
    board_like() {

    },
    board_save() {

    }
  },
  computed: {
    comment_ch() {
      if(this.comment !== "") {
        this.upload_ch = true;
      } else {
        this.upload_ch = false;
		  }
	  },
    // displayLnegth() {
    //   this.$store.dispatch('displayLength')
    // }
  },
  watch: {
    // watch는 선언만으로 되는게 신기하단
    comment_ch() {
    
    },
    // displayLnegth(e) {
    //   console.log(e)
    // }
  },
  async mounted() {
    try {
      // 게시물 전체 조회
      const res = await axios.get(import.meta.env.VITE_FULL_DB_URL + '/make_select');
      console.log(res);
      this.user_list = res.data;
      this.commentLength = res.data.commentLength.length

      // 유저 전체 조회
      // console.log에서도 없는값을 조회할려하면 오류걸리면서 그 아래 코드는 실행안되고 멈추는 현상이 발생한단
      const user = await axios.post(import.meta.env.VITE_FULL_DB_URL + '/select', { name : this.name });
      console.log(user);
      this.users_list = user.data;
      console.log(this.users_list);
      // console.log(JSON.parse(user.data[0].img));
      // console.log(user.data[0]);
      // console.log(user.data[0].img.split(','));
    } catch(e) {
      console.log(e)
    }

  }
}
</script>


<template>
  <div class="home">
    <div class="menu">
      <div class="section">
        <div class="left__list">
          <!-- 스토리 -->
          <div class="__store">
            <!-- 모바일에선 5개만 나오도록하면 display.가 맞는단 -->
            <swiper class="swiper swiper-container" :slides-per-view="6" :space-between="20" :modules="modules" navigation>
              <!-- swiper 자체에 걸린 wrapper로 인해 스타일이 이상해지므로 이건 일단 뺸단 -->
              <!-- <div class="swiper-wrapper"> -->
                <!-- wraapr는 여러개일때 -> 넘겨야할때 써야한단 -> 일자로 있는거에다가 쓰면 넘어가지는걸로 써져서 이미지가 꺠진다 -> 즉 swiper 자체적인 스타일인 wrapper는 여러개로 넘어가질때만 사용하고 하나로 나와지는건(안넘어가는거) 쓰지말잔 -> 스타일부분도 여러개일때 넘기는건데도 warper가 필요없다? -> 상황에 맞게 사용하잔 -->
                <!-- 본인 -->
                <swiper-slide class="swiper__item">
                  <div class="__img" ></div>
                  <div class="__nickname">{{ nickname }}</div>
                </swiper-slide>
                <swiper-slide class="swiper__item" v-for="user in users_list" :key="user">
                  <!-- <img :src="user.profile" class="__img" /> -->
                  <div :src="user.profile" class="__img" ></div>
                  <div class="__nickname">{{ user.nickname }}</div>
                </swiper-slide>
              <!-- </div> -->
            </swiper>
          </div>
          <!-- 게시글 -->
          <!-- 반복문은 반복 개수만큼 반복문건 요소가 복사된다 (ex 리스트가 3개면 요소도 3개가 된다) -->
          <!-- <MakeUser class="__board" v-bind:user_list="user_list"></MakeUser> -->
          <div class="__board" v-for="user in user_list.row" :key="user">
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
                <div class="__icons __heart" @click="board_like()"><i class="fa-regular fa-heart"></i></div>
                <div class="__icons __comment"><i class="fa-regular fa-comment"></i></div>
                <div class="__icons __message" @click="msg_page()"><i class="fa-regular fa-paper-plane"></i></div>
                <div class="__icons __save" @click="board_save()"><i class="fa-regular fa-bookmark"></i></div>
              </div>
              <div class="comment__info">
                <div class="info__title" v-if="user.make_write !== ''">{{ user.nickname }} <span>{{ user.make_write }}</span></div>
              </div>
              <!-- comment length -->
              <div class="comment__length">
                <div class="__length">
                  <div class="info__title">댓글 ? 개 모두 보기</div>
                </div>
              </div>
              <!-- comment data -->
              <div class="comment__info">
                <div class="comment__data"  v-for="comment in user_list.comment" :key="comment" >
                  <div class="info__title" v-if="user.idx === comment.make_id">{{ comment.user_nickname }} <span>{{ comment.comment }}</span></div>
                </div>
              </div>
              <div class="comment__date">
                <div class="date__title">1일 전</div>
              </div>
              <div class="comment__text">
                <div class="__icon"><i class="fa-regular fa-face-smile"></i></div>
                <div class="__text"><input v-model="comment" placeholder="댓글 달기..." /></div>
                <div class="__uploadBtn" @click="comment_btn(user.idx)" :class="{ upload_ch }">게시</div>
              </div>
            </div>
          </div>
          <!-- 끝난 지점엔 항상 체크표시가 나오게 아이템 하나 추가 -->
          <div class="__board __check">
            <div class="__success">
              <img src="https://static.cdninstagram.com/rsrc.php/v3/yb/r/sHkePOqEDPz.gif">
            </div>
            <div class="__success big">모두 확인했습니다</div>
            <div class="__success mid">최근 3일 동안 새롭게 올라온 게시물을 모두 확인했습니다.</div>
            <div class="__success sma">이전 게시물 보기</div>
          </div>
        </div>
        <div class="right__list">
          <div class="__myInfo">
            <div class="__infoBox">
              <div class="__myImg" @click="myPage(name)"></div>
              <div class="__myData">
                <div class="__nickname">{{ nickname }}</div>
                <div class="__name">{{ name }}</div>
              </div>
            </div>
            <div class="__transform">전환</div>
          </div>
          <div class="__sug">
            <div class="__mySug">
              <div class="__title">회원님을 위한 추천</div>
              <div class="__search">모두보기</div>
            </div>
            <div class="__sugList">
              <!-- 5개만 가져오기 -> 전체누르면 전체창에서 전체 나오게하긴 -->
              <div class="__item"  v-for="user in users_list.slice(0,5)" :key="user">
                <!-- <img :src="user.profile" class="__myImg" @click="myPage(user.nickname, user.name)" /> -->
                <div :src="user.profile" class="__myImg" @click="myPage(user.name)" ></div>
                <div class="__myData">
                  <div class="__nickname">{{ user.nickname }}</div>
                  <div class="__name">{{ user.name }}</div>
                </div>
                <div class="__transform">팔로우</div>
              </div>
            </div>
          </div>
          <div class="__footer">
            <div class="__content">
              <p>소개 도움말 홍보 센터 API 채용정보</p>
              <p>개인정보처리방침 약관 위치 언어</p>
            </div>
            <div class="__conform">© 2022 INSTAGRAM FROM META</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<!-- scoped를 걸면 라이브러리에 있는 css 커마변경이 안된단 -> scoped를 풀면 가능하다 -->
<style lang="scss">

.home {
  width: calc(100% - 335px);
  // 처음에 height 잡아놓는건 값이 없기때문에 레이아웃 잡기위해 예시로 잡는거다, 값이 100vh초과한다면 짤리는 현상이 나오니 풀던가 아니면 min-height로 잡으면 그 이상 넘어가도 넘어가진단
  // 좋은콤보론 min-height로 얼마까지 잡고, 그 아래에다 또 height을 100%를 주면 그이상 늘어나면 100프로로 되기떄문에 2개로 잡는게 좋단
  min-height: 100vh;
  margin-left: auto;
  background: rgb(250, 250, 250);
  .menu {
    width: 830px;
    height: 100%;
    margin: auto;
    .section {
      width: 100%;
      height: 100%;
      display: flex;
      .left__list {
        max-width: 470px;
        width: 100%;
        .__store {
          background: rgb(255,255,255);
          border: 1px solid rgb(219, 219, 219);
          border-radius: 8px;
          margin-bottom: 0;
          margin-top: 16px;
          padding: 15px;
          min-height: 80px;
          // box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          .swiper {
            padding: 5px 0;
            width: 100%;
            .swiper__item {
              cursor: pointer;
              .__img {
                display: flex;
                justify-content: center;
                align-items: center;
                background: #eee;
                width: 56px;
                height: 56px;
                border-radius: 50%;
                position: relative;
                z-index: 10;
              }
              .__nickname {
                font-size: 12px;
                color: #262626;
                margin-top: 5px;
                text-align: center;
              }
            }
            // swiper navigation button costom
            .swiper-button-prev,
            .swiper-button-next {
              border-radius: 50%;
              max-width: 30px;
              max-height: 30px;
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              background: #fff;
              &::after {
                font-size: 15px;
                font-weight: bold;
              }
            }
            .swiper-button-prev {
              left: 0;
            }
            .swiper-button-next {
              right: 0;
            }
            .swiper-button-prev.swiper-button-disabled {
              display: none;
            }
            .swiper-button-next.swiper-button-disabled {
              display: none;
            }
          }
        }
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
              .comment__data {
                margin-top: 5px;
                &:first-child {
                  margin-top: 0;
                }
              }
            }
            .comment__length {
              padding: 5px 11px;
              .__length {
                cursor: pointer;
                color: #A8A8A8;
                font-size: 14px;
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
            position: fixed;
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
        .__check {
          padding: 32px 12px;
          height: 235px;
          margin-bottom: 70px;
          // 공통인건 공통클래스로 묶어 해주지만 각각 색깔이 다르다면 각각 선언해서 해줘야한다
          // 색깔들은 공통적인걸 사용하면 좋단 -> ex 다크모드 할떄나?
          .__success {
            text-align: center;
            margin-bottom: 10px;
            &:last-child {
              margin-bottom: 0;
            }
          }
          .big {
            font-size: 18px;
          }
          .mid {
            font-size: 14px;
            color: #828282;
          }
          .sma {
            font-size: 14px;
            color: #0095F6;
          }
        }
      }
      .right__list {
        width: 100%;
        max-width: 319px;
        max-height: 930px;
        margin-left: auto;
        margin-top: 33px;
        .__myInfo {
          margin-top: 16px;
          min-height: 66px;
          margin-bottom: 10px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          .__infoBox {
            display: flex;
            align-items: center;
            .__myImg {
              background: #eee;
              width: 56px;
              height: 56px;
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
                font-size: 14px;
                color: rgb(142, 142, 142);
              }
            }
          }
          .__transform {
            margin-left: auto;
            margin-right: 12px;
            font-size: 13px;
            color: rgb( 0, 149, 246);
            font-weight: bold;
            cursor: pointer;
          }
        }
        .__sug {
          min-height: 280px;
          box-sizing: border-box;
          padding: 8px 0;
          .__mySug {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .__title {
              color: rgb(142, 142, 142);
              font-size: 14px;
              font-weight: bold;
            }
            .__search {
              cursor: pointer;
              font-size: 12px;
              font-weight: bold;
              color: #000;
            }
          }
          .__sugList {
            .__item {
              display: flex;
              align-items: center;
              padding-top: 20px;
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
                  font-size: 14px;
                  color: rgb(142, 142, 142);
                }
              }
            }
            .__transform {
              margin-left: auto;
              font-size: 13px;
              color: rgb( 0, 149, 246);
              font-weight: bold;
              cursor: pointer;
            }
          }
        }
        .__footer {
          margin-top: 30px;
          min-height: 110px;
          box-sizing: border-box;
          color: rgb(199,199,199);
          font-size: 12px;
          .__content {
            margin-bottom: 16px;
            p {
              margin-top: 5px;
            }
          }
        }
      }
    }
  }
}


// pc 2 ->>
@media screen and (max-width: 1700px) {
  .home {
    width: calc(100% - 245px);
  }
}

  // tablet - 1024, mobile - 760이 평균인데 instagram에 맞춰서 tablet - 1250, mobile - 760으로 해본다 (페이지마다 조금씩 차이가 있단)
  // tablet
@media screen and (max-width: 1200px) {
  .home {
    width: calc(100% - 72px);
    .menu {
      max-width: 830px;
    }
  }
}

// tablet2 ->>
@media screen and (max-width: 999px) {
  .home {
    width: calc(100% - 72px);
    .menu {
      max-width: 470px;
      .section {
        .right__list {
          display: none;
        }
      }
    }
  }
}

// mobile
@media screen and (max-width: 760px) {
  .home {
    .menu {
      max-width: 470px;
      // 게시판
      .__board {
        .board__content {
          .comment__text {
            display: none !important;
          }
        }
        .board__setting {
          width: 260px;
        }
      }
    }
    margin: auto;
  }
}

// mobile2 ->>
@media screen and (max-width: 660px) {
  .home {
    width: 100%;
    .menu {
      width: 100%;
    }
    margin: auto;
  }
}
</style>