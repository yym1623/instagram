<script>
export default {
  data() {
    return {
      id: "",
      pw: "",

      focusBtn: false,
    }
  },
  computed: {
    id_check() {
      if(this.id !== "" && this.pw !== "") {
        this.focusBtn = true;
      } else {
        this.focusBtn = false;
      }
    }
  },
  watch: {
    id_check() {
      
    }
  }
}
</script>


<template>
  <div class="login">
    <div class="inner">
      <div class="hd__login">
        <div class="__loginBox">
          <div class="__loginInner">
            <div class="__title">Instagram</div>
            <div class="__loginInfo">
              <div class="__id">
                <input type="text" v-model="id" placeholder="전화번호, 사용자 이름 또는 이메일" />
              </div>
              <div class="__pw">
                <input type="password" v-model="pw" placeholder="비밀번호" />
              </div>
            </div>
            <div class="__loginBtn">
              <button :class="{ focusBtn }">로그인</button>
            </div>
            <div class="__of">
              <div class="__left"></div>
              <div class="__content">또는</div>
              <div class="__right"></div>
            </div>
            <div class="__etcBox ">
              <div class="__facebookLogin"><span><i class="fa-brands fa-square-facebook"></i></span>Facebook으로 로그인</div>
              <div class="__errorPw">비밀번호를 잊으셨나요?</div>
            </div>
          </div>
        </div>
      </div>
      <div class="ft__regster">
        <div class="__text">계정이 없으신가요? <span>가입하기</span></div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
  .login {
    max-width: 460px;
    width: 100%;
    height: 85vh;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .inner {
      max-width: 400px;
      height: 100%;
      width: 100%; 
      margin: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .hd__login {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        padding-top: 2em;
        // box-sizing: border-box를 안해주면 padding만큼 늘어난단
        // 고정(px)으로 줄거와 동적(em, rem)줄걸 명확히 구분해서 적어란
        box-sizing: border-box;
        border: 1px solid rgb(219, 219, 219);
        background: #fff;
        .__loginBox {
          margin: auto;
          width: 90%;
          .__loginInner {
            width: 75%;
            margin: auto;
            .__title {
              font-family: 'Lobster', cursive;
              font-size: 3rem;
              text-align: center;
              cursor: pointer;
            }
            .__loginInfo {
              padding-top: 4rem;
              margin: auto;
              .__id {
                input {
                  font-size: 12px;
                  background-color: rgb(250, 250, 250);
                  outline: none;
                  border: 1px solid #eee;
                  width: 100%;
                  height: 35px;
                  padding: 10px;
                  box-sizing: border-box;
                  border-radius: 5px;
                }
              }
              .__pw {
                margin-top: .5rem;
                input {
                  font-size: 12px;
                  padding: 10px;
                  background-color: rgb(250, 250, 250);
                  outline: none;
                  border: 1px solid #eee;
                  width: 100%;
                  height: 35px;
                  box-sizing: border-box;
                  border-radius: 5px;
                }
              }
            }
            .__loginBtn {
              margin: 1rem auto auto auto;
              button {
                width: 100%;
                height: 30px;
                font-size: 15px;
                color: #fff;
                font-weight: bold;
                background: rgb(0, 149, 246);
                border: 1px solid transparent;
                border-radius: 5px;
                opacity: .5;
              }
              button.focusBtn {
                opacity: 1;
                cursor: pointer;
              }
            }
            .__of {
              margin: 2rem auto auto auto;
              display: flex;
              justify-content: center;
              align-items: center;
              .__left,
              .__right {
                height: 1px;
                background: #eee;
                width: 40%;
              }
              .__content {
                color: rgb(142, 142, 142);
                font-size: 13px;
                font-weight: bold;
              }
              .__left {
                margin-right: auto;
              }
              .__right {
                margin-left: auto;
              }
            }
            .__etcBox {
              margin: 2rem auto auto auto;
              text-align: center;
              .__facebookLogin {
                cursor: pointer;
                color: #385185;
                span {
                  margin-right: .5rem;
                  i {
                    font-size: 18px;
                  }
                }
              }
              .__errorPw {
                cursor: pointer;
                margin-top: 1.5rem;
                padding-bottom: 1.5rem;
                font-size: 13px;
                color: rgb(0, 55, 107);
              }
            }
          }
        }
      }
      .ft__regster {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 8%;
        margin-top: 1rem;
        box-sizing: border-box;
        background: #fff;
        border: 1px solid rgb(219, 219, 219);
        .__text {
          text-align: center;
          span {
            color: rgb(0, 149, 246);
            font-weight: bold;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>