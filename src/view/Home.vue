<script>
export default {
  data() {
    return {
      nickname: this.$cookies.get('nickname'),
      name: this.$cookies.get('name'),
    }
  },
  mounted() {

  }
}
</script>


<template>
  <div class="home">
    <div class="menu">
      <div class="section">
        <div class="left__list">
          <div class="__store"></div>
          <div class="__board"></div>
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


<style lang="scss" scoped>

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
          padding: 16px 0;
          min-height: 80px;
          // box-sizing: border-box;
        }
        .__board {
          border-radius: 8px;
          margin-top: 16px;
          margin-bottom: 12px;
          background: rgb(255,255,255);
          border: 1px solid rgb(219, 219, 219);
          box-sizing: border-box;
          min-height: 880px;
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
            padding: 16px 8px;
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
          margin-top: 16px;
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