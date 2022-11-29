<script>
export default {
  data() {
    return {
      nickname: this.$cookies.get('nickname'),
      name: this.$cookies.get('name'),
    }
  },
}
</script>

<template>
  <div class="message">
    <div class="inner">
      <div class="left__info">
        <div class="__myInfo">
          <div class="__nicknameBox">
            <div class="__nickname">{{ nickname }}</div>
            <div class="__icon">
              <span class="material-symbols-outlined">expand_more</span>
            </div>
          </div>
          <div class="__newMes">
            <i class="fa-regular fa-pen-to-square"></i>
          </div>
        </div>
        <div class="__myMenu">
          <div class="__myInfos">
            <div class="__infoBox">
              <div class="__myImg"></div>
              <div class="__myData">
                <div class="__nickname">{{ name }}</div>
                <div class="__name">message test (date)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right__message">
        <div class="__message">
          <div class="__logo"><i class="fa-regular fa-paper-plane"></i></div>
          <div class="__title">내 메시지</div>
          <div class="__text">친구나 그룹에 비공개 사진과 메시지를 보내보세요.</div>
          <button class="__btn">메세지 보내기</button>
        </div>
        <!-- 실제 socket message 창 연결 -->
        <!-- <div class="__message"></div> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.message {
  position: static;
  width: calc(100% - 335px);
  min-height: 100vh;
  margin-left: auto;
  background: rgb(250, 250, 250);
  padding: 20px;
  box-sizing: border-box;
  .inner {
    max-width: 932px;
    width: 100%;
    height: 895px;
    margin: auto;
    display: flex;
    border: 1px solid rgb(219, 219, 219);
    border-radius: 5px;
    box-sizing: border-box;
    .left__info {
      min-width: 350px;
      // width: 100%;
      height: 100%;
      border-right: 1px solid rgb(219, 219, 219);
      box-sizing: border-box;
      .__myInfo {
        display: flex;
        height: 60px;
        // justify-content: center;
        align-items: center;
        padding: 0 20px;
        border-bottom: 1px solid rgb(219, 219, 219);
        box-sizing: border-box;
        .__nicknameBox {
          display: flex;
          // flex가 걸린 자식요소에 felx로 각각 맞춰줄 수 있단
          flex: 1;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          .__icon {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 3px;
            span {
              font-size: 30px;
            }
          }
          &:active {
            opacity: .8;
          }
        }
        .__newMes {
          display: flex;
          align-items: center;
          font-size: 24px;
          cursor: pointer;
        }
      }
      .__myMenu {
        height: 100%;
        overflow: hidden auto;
        padding-top: 8px;
        .__myInfos {
          padding: 8px 20px;
          display: flex;
          align-items: center;
          cursor: pointer;
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
          &:hover {
            background: rgb(245, 245, 245);
          }
        }
      }
    }
    .right__message {
      max-width: 582px;
      width: 100%;
      height: 100%;
      padding: 24px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      .__message {
        text-align: center;
        .__logo {
          font-size: 58px;
          i {
            border: 1px solid #333;
            border-radius: 50%;
            padding: 18px;
          }
        }
        .__title {
          margin-top: 20px;
          font-size: 22px;
          color: #262626;
        }
        .__text {
          margin-top: 10px;
          font-size: 14px;
          color: #828282
        }
        .__btn {
          margin-top: 20px;
          width: 110px;
          height: 30px;
          font-size: 14px;
          font-weight: bold;
          color: #fff;
          cursor: pointer;
          border-radius: 5px;
          padding: 5px 10px;
          border: 1px solid transparent;
          background: rgb(0, 149, 246);
          &:active {
            opacity: .8;
          }
        }
      }
    }
  }
}

// pc 2 ->>
@media screen and (max-width: 1700px) {
  .message {
    position: static;
    width: calc(100% - 245px);
  }
}

  // tablet - 1024, mobile - 760이 평균인데 instagram에 맞춰서 tablet - 1250, mobile - 760으로 해본다 (페이지마다 조금씩 차이가 있단)
  // tablet
@media screen and (max-width: 1200px) {
  .message {
    position: static;
    width: calc(100% - 72px);
  }
}

// tablet2 ->>
@media screen and (max-width: 999px) {
  .message {
    position: static;
    width: calc(100% - 72px);
    padding: 0;
    .inner {
      height: 100vh;
      .left__info {
        min-width: 300px;
      }
    }
  }
}

// mobile
@media screen and (max-width: 760px) {
  .message {
    position: fixed;
    top: 0;
    width: 100%;
    margin: auto;
    padding: 0;
    .inner {
      height: 100vh;
    }
  }
}

// mobile2 ->>
@media screen and (max-width: 660px) {
  .message {
    position: fixed;
    top: 0;
    width: 100%;
    margin: auto;
    padding: 0;
    .inner {
      width: 100%;
      height: 100vh;
      margin: auto;
    }
  }
}
</style>