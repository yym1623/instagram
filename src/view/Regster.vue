<script>
import axios from 'axios';
export default {
  data() {
    return {
      id: "",
      name: "",
      nickname: "",
      pw: "",

      error_email: "이메일 주소를 정확히 입력해주세요",

      focusBtn: false,
      active__id: false,
      error_id: false,
      active__name: false,
      error_name: false,
      active__nickname: false,
      error_nickname: false,
      active__pw: false,
      error_pw: false,

      singUp: true,
    }
  },
  methods: {
    async regster() {
      try {
        if(this.focusBtn === true) {
          this.singUp = false;
          const res = await axios({
            url: 'http://localhost:8000/regster',
            method: 'POST',
            data: {
              email: this.id,
              pw: this.pw,
              name: this.name,
              nickname: this.nickname
            }
          })
          console.log(res);
          if(res.data.message) {
            this.error_email = res.data.message;
            this.error_id = true;
          } else {
            // 회원가입성공 -> 로그인페이지로 이동
            this.$router.push('/')
          }
          this.singUp = true;

        }
      } catch(e) {
        console.log(e)
      }
    },
    // id
    label_event_id() {
      this.active__id = true;
    },
    id_error_check() {
      // 이메일 형식 검사
      const validateEmail = /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z0-9\\-]+/
      // test() - 문자열이 정규 표현식을 만족하는지 판별한다
      if (!validateEmail.test(this.id) || !this.id) {
        this.error_id = true;
        return
      } else {
        this.error_id = false
      }
    },
    // name
    label_event_name() {
      this.active__name = true;
    },
    name_error_check() {
      // 성명 형식 검사 - 2글자 이상이면 가능
      // const validateEmail = /{1,2}$/
      // // test() - 문자열이 정규 표현식을 만족하는지 판별한다
      // if (!validateEmail.test(this.name) || !this.name) {
      //   this.error_name = true;
      //   return
      // } else {
      //   this.error_name = false
      // }
    },
    // nickname
    label_event_nickname() {
      this.active__nickname = true;
    },
    nickname_error_check() {
      // 닉네임 형식 검사 - 디비에 없는거면 다 가능
      // const validateEmail = /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z0-9\\-]+/
      // // test() - 문자열이 정규 표현식을 만족하는지 판별한다
      // if (!validateEmail.test(this.nickname) || !this.nickname) {
      //   this.error_nickname = true;
      //   return
      // } else {
      //   this.error_nickname = false
      // }
    },
    // pw
    pw_error_check() {
      // 비밀번호 형식 검사(영문, 숫자, 특수문자)
      const validatePassword = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/

      if (!validatePassword.test(this.pw) || !this.pw) {
        this.error_pw = true;
        return
      } else {
        this.error_pw = false
      }
    },
    label_event_pw() {
      this.active__pw = true;
    },
    documentClick(e){
      let el = this.$refs.document
      let target = e.target
      if (( el !== target) && !el.contains(target) && this.id == "") {
        this.active__id = false;
      }
      if(( el !== target) && !el.contains(target) && this.name == "") {
        this.active__name = false;
      }
      if(( el !== target) && !el.contains(target) && this.nickname == "") {
        this.active__nickname = false;
      }
      if(( el !== target) && !el.contains(target) && this.pw == "") {
        this.active__pw = false;
      }
    },
    // 페이스북 로그인 연동 (https)
    FBLoginBtn:function(){
      window.FB.login(function(response) {
        if (response.status === 'connected') {
          window.FB.api('/me', 'get', {fields: 'name,email'}, function(r) {

            const facebook_email = r.email;
            const facebook_name = r.name;

            console.log(facebook_email);
            console.log(facebook_name);

          })
        }
      }, {scope: 'public_profile,email'});
    }
  },
  computed: {
    id_check() {
      if(this.error_id === false && this.id !== "" && this.error_name === false && this.name !== "" && this.error_nickname === false && this.nickname !== "" && this.error_pw === false && this.pw !== "" ) {
        this.focusBtn = true;
      } else {
        this.focusBtn = false;
      }
    }
  },
  watch: {
    // computed는 함수명이랑 같게 입력하고, data부분은 '' -> 문자열로 하여 함수를 만들어야 해야 동작하는거 같다
    id_check() {

    },
    'id': function() {
      this.id_error_check()
    },
    'name': function() {
      this.name_error_check()
    },
    'nickname': function() {
      this.nickname_error_check()
    },
    'pw': function() {
      this.pw_error_check()
    },
  },
  created () {
    document.addEventListener('click', this.documentClick)
  },
  mounted() {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : '701019071171273', // 아까 기억하라던 내 앱 ID
        cookie     : true,
        xfbml      : true,
        version    : 'v11.0'
      });
      window.FB.AppEvents.logPageView();
    };
  },
  destroyed () {
    document.removeEventListener('click', this.documentClick)
  }
}
</script>


<template>
  <div class="regster" ref="document">
    <div class="inner">
      <div class="hd__regster">
        <div class="__regsterBox">
          <div class="__regsterInner">
            <div class="__title">Instagram</div>
            <div class="__mainContent">친구들과 사진과 동영상을 보려면 가입하세요</div>
            <div class="__etcBox ">
              <button class="__facebookLogin" @click="FBLoginBtn()"><span><i class="fa-brands fa-square-facebook"></i></span>Facebook으로 로그인</button>
            </div>
            <div class="__of">
              <div class="__left"></div>
              <div class="__content">또는</div>
              <div class="__right"></div>
            </div>
            <div class="__regsterInfo">
              <!-- id -->
              <div class="__id" @click="label_event_id($event)">
                <label :class="{ active__id }" for="id" class="id__label">전화번호, 사용자 이름 또는 이메일</label>
                <input type="text" id="id" v-model="id"  @keydown.tab="label_event_name()" />
                <p v-show="error_id" class="error__id">{{ error_email }}</p>
              </div>
              <!-- name -->
              <div class="__name" @click="label_event_name($event)">
                <label :class="{ active__name }" for="name" class="name__label">성명</label>
                <input type="text" id="name" v-model="name"  @keydown.tab="label_event_nickname()" />
                <p v-show="error_name" class="error__name">성명을 정확히 입력해주세요</p>
              </div>
              <!-- nickname -->
              <div class="__nickname" @click="label_event_nickname($event)">
                <label :class="{ active__nickname }" for="nickname" class="nickname__label">사용자 이름</label>
                <input type="text" id="nickname" v-model="nickname"  @keydown.tab="label_event_pw()" />
                <p v-show="error_nickname" class="error__nickname">사용자 이름을 정확히 입력해주세요</p>
              </div>
              <!-- pw -->
              <div class="__pw" @click="label_event_pw($event)">
                <label :class="{ active__pw }" for="pw" class="pw__label">비밀번호</label>
                <input type="password" id="pw" v-model="pw" @keydown.enter="regster()" />
                <p v-show="error_pw" class="error__pw">비밀번호를 정확히 입력해주세요</p>
              </div>
            </div>
            <div class="__regsterBtn">
              <button :class="{ focusBtn }" @click="regster()" v-if="singUp">가입</button>
              <div class="__lodingBox" v-else>
                <img class="__loding" src="https://subarucustomersupport.powerappsportals.com/blue-spinner.gif" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ft__regster">
        <div class="__text">계정이 있으신가요? <RouterLink to="/">로그인</RouterLink></div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
  .regster {
    max-width: 460px;
    width: 100%;
    height: 85vh;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .inner {
      max-width: 350px;
      height: 100%;
      width: 100%; 
      margin: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .hd__regster {
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
        .__regsterBox {
          margin: auto;
          margin-bottom: 30px;
          width: 90%;
          min-height: 500px;
          .__regsterInner {
            width: 85%;
            margin: auto;
            .__mainContent {
              margin: 30px 0 40px 10px;
              text-align: center;
              color: rgb(142, 142, 142);
              font-size: 17px;
              font-weight: bold;
            }
            .__etcBox {
              margin: 2rem auto auto auto;
              text-align: center;
              button {
                width: 100%;
                height: 30px;
                font-size: 15px;
                color: #fff;
                font-weight: bold;
                background: rgb(0, 149, 246);
                border: 1px solid transparent;
                border-radius: 5px;
                color: #fff;
                cursor: pointer;
                span {
                  margin-right: .5rem;
                  i {
                    font-size: 18px;
                  }
                }
                &:active {
                  box-shadow: inset -.3rem -.1rem 1.4rem  rgb(0, 100, 200), inset .3rem .4rem .8rem rgb(0, 149, 246); 
                }
              }
            }
            .__of {
              margin: 1.5rem auto auto auto;
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
            .__title {
              font-family: 'Lobster', cursive;
              font-size: 3rem;
              text-align: center;
              cursor: pointer;
            }
            .__regsterInfo {
              padding-top: 2rem;
              margin: auto;
              // id
              .__id {
                position: relative;
                width: 100%;
                height: 100%;
                input {
                  font-size: 12px;
                  background-color: rgb(250, 250, 250);
                  outline: none;
                  border: 1px solid #eee;
                  width: 100%;
                  height: 38px;
                  padding-top: 8px;
                  padding-left: 5px;
                  box-sizing: border-box;
                  border-radius: 5px;
                }
                .id__label {
                  position: absolute;
                  display: flex;
                  align-items: center;
                  padding: 10px;
                  font-size: 12px;
                  transition: .3s;
                  cursor: text;
                }
                .id__label.active__id {
                  padding: 5px;
                  font-size: 10px;
                  transition: .3s;
                }
                .error__id {
                  color: red;
                  padding: 5px;
                  font-size: 12px;
                }
              }
              // name
              .__name {
                margin-top: .5rem;
                position: relative;
                width: 100%;
                height: 100%;
                input {
                  font-size: 12px;
                  background-color: rgb(250, 250, 250);
                  outline: none;
                  border: 1px solid #eee;
                  width: 100%;
                  height: 38px;
                  padding-top: 8px;
                  padding-left: 5px;
                  box-sizing: border-box;
                  border-radius: 5px;
                }
                .name__label {
                  position: absolute;
                  display: flex;
                  align-items: center;
                  padding: 10px;
                  font-size: 12px;
                  transition: .3s;
                  cursor: text;
                }
                .name__label.active__name {
                  padding: 5px;
                  font-size: 10px;
                  transition: .3s;
                }
                .error__name {
                  color: red;
                  padding: 5px;
                  font-size: 12px;
                }
              }
              // nickname
              .__nickname {
                margin-top: .5rem;
                position: relative;
                width: 100%;
                height: 100%;
                input {
                  font-size: 12px;
                  background-color: rgb(250, 250, 250);
                  outline: none;
                  border: 1px solid #eee;
                  width: 100%;
                  height: 38px;
                  padding-top: 8px;
                  padding-left: 5px;
                  box-sizing: border-box;
                  border-radius: 5px;
                }
                .nickname__label {
                  position: absolute;
                  display: flex;
                  align-items: center;
                  padding: 10px;
                  font-size: 12px;
                  transition: .3s;
                  cursor: text;
                }
                .nickname__label.active__nickname {
                  padding: 5px;
                  font-size: 10px;
                  transition: .3s;
                }
                .error__nickname {
                  color: red;
                  padding: 5px;
                  font-size: 12px;
                }
              }
              // pw
              .__pw {
                margin-top: .5rem;
                position: relative;
                width: 100%;
                height: 100%;
                input {
                  font-size: 12px;
                  padding-top: 8px;
                  padding-left: 5px;
                  background-color: rgb(250, 250, 250);
                  outline: none;
                  border: 1px solid #eee;
                  width: 100%;
                  height: 38px;
                  box-sizing: border-box;
                  border-radius: 5px;
                }
                .pw__label {
                  position: absolute;
                  display: flex;
                  align-items: center;
                  padding: 10px;
                  font-size: 12px;
                  transition: .3s;
                  cursor: text;
                }
                .pw__label.active__pw {
                  padding: 5px;
                  font-size: 10px;
                  transition: .3s;
                }
                .error__pw {
                  color: red;
                  padding: 5px;
                  font-size: 12px;
                }
              }
            }
            .__regsterBtn {
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
                &:active {
                  box-shadow: inset -.3rem -.1rem 1.4rem  rgb(0, 100, 200), inset .3rem .4rem .8rem rgb(0, 149, 246); 
                }
              }
              .__lodingBox {
                width: 100%;
                height: 30px;
                background: rgb(0, 149, 246);
                border: 1px solid transparent;
                border-radius: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                .__loding {
                  width: 20px;
                  height: 20px;
                }

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
          a {
            color: rgb(0, 149, 246);
            font-weight: bold;
            text-decoration: none;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>