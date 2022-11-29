<script>
import Swipers, { Navigation, Pagination, Scrollbar } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'

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
      modules: [ Navigation, Pagination, Scrollbar ],
    }
  },
  data() {
    return {
      nickname: this.$cookies.get('nickname'),
      name: this.$cookies.get('name'),
    }
  },
}
</script>


<template>
  <div class="home">
    <div class="menu">
      <div class="section">
        <div class="left__list">
          <!-- 스토리 -->
          <div class="__store">
            <swiper class="swiper swiper-container" :slides-per-view="6" :space-between="20" :modules="modules" navigation>
              <div class="swiper-wrapper">
                <!-- test item -> 7(swiper test를 위해 swiper per view보다 하나 더 추가) -->
                <swiper-slide class="swiper__item">
                  <div class="__img">1</div>
                  <div class="__nickname">{{ nickname }}</div>
                </swiper-slide>
                <swiper-slide class="swiper__item">
                  <div class="__img">2</div>
                  <div class="__nickname">{{ nickname }}</div>
                </swiper-slide>
                <swiper-slide class="swiper__item">
                  <div class="__img">3</div>
                  <div class="__nickname">{{ nickname }}</div>
                </swiper-slide>
                <swiper-slide class="swiper__item">
                  <div class="__img">4</div>
                  <div class="__nickname">{{ nickname }}</div>
                </swiper-slide>
                <swiper-slide class="swiper__item">
                  <div class="__img">5</div>
                  <div class="__nickname">{{ nickname }}</div>
                </swiper-slide>
                <swiper-slide class="swiper__item">
                  <div class="__img">6</div>
                  <div class="__nickname">{{ nickname }}</div>
                </swiper-slide>
                <swiper-slide class="swiper__item">
                  <div class="__img">7</div>
                  <div class="__nickname">{{ nickname }}</div>
                </swiper-slide>
              </div>
            </swiper>
          </div>
          <!-- 게시글 -->
          <div class="__board">
            <div class="board__title">
              <div class="__myInfo">
              <div class="__infoBox">
                <div class="__myImg"></div>
                <div class="__myData">
                  <div class="__nickname">{{ nickname }}</div>
                  <div class="__name">{{ name }}</div>
                </div>
              </div>
              <div class="__transform"><i class="fa-solid fa-ellipsis"></i></div>
            </div>
            </div>
            <div class="board__body">
              <!-- <img class="body__img" src="" alt=""  onerror="this.src='/public/roding.png'"> -->
            </div>
            <div class="board__content">
              <div class="content__comu">
                <div class="__icons __heart"><i class="fa-regular fa-heart"></i></div>
                <div class="__icons __comment"><i class="fa-regular fa-comment"></i></div>
                <div class="__icons __message"><i class="fa-regular fa-paper-plane"></i></div>
                <div class="__icons __save"><i class="fa-regular fa-bookmark"></i></div>
              </div>
              <div class="comment__heart">
                <div class="heart__img"></div>
                <div class="heart__text">test님이 좋아합니다</div>
              </div>
              <div class="comment__info">
                <div class="info__title">{{ nickname }}</div>
              </div>
              <div class="comment__date">
                <div class="date__title">1일 전</div>
              </div>
              <div class="comment__text">
                <div class="__icon"><i class="fa-regular fa-face-smile"></i></div>
                <div class="__text"><input type="text" placeholder="댓글 달기..." /></div>
                <div class="__uploadBtn">게시</div>
              </div>
            </div>
          </div>
        </div>
        <div class="right__list">
          <div class="__myInfo">
            <div class="__infoBox">
              <div class="__myImg"></div>
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
              <!-- 5개 테스트 -->
              <div class="__item">
                <div class="__myImg"></div>
                <div class="__myData">
                  <div class="__nickname">nickname(test)</div>
                  <div class="__name">name(test)</div>
                </div>
                <div class="__transform">팔로우</div>
              </div>
              <div class="__item">
                <div class="__myImg"></div>
                <div class="__myData">
                  <div class="__nickname">nickname(test)</div>
                  <div class="__name">name(test)</div>
                </div>
                <div class="__transform">팔로우</div>
              </div>
              <div class="__item">
                <div class="__myImg"></div>
                <div class="__myData">
                  <div class="__nickname">nickname(test)</div>
                  <div class="__name">name(test)</div>
                </div>
                <div class="__transform">팔로우</div>
              </div>
              <div class="__item">
                <div class="__myImg"></div>
                <div class="__myData">
                  <div class="__nickname">nickname(test)</div>
                  <div class="__name">name(test)</div>
                </div>
                <div class="__transform">팔로우</div>
              </div>
              <div class="__item">
                <div class="__myImg"></div>
                <div class="__myData">
                  <div class="__nickname">nickname(test)</div>
                  <div class="__name">name(test)</div>
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
            .swiper__item {
              cursor: pointer;
              .__img {
                display: flex;
                justify-content: center;
                align-items: center;
                background: #eee;
                width: 56px;
                height: 56px ;
                border-radius: 50%;
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
            min-height: 275px;
            // height: 100%;
            .body__img {
              width: 100%;
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
                margin-left: auto;
              }
            }
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