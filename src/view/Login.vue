<script>
import axios from 'axios';
export default {
  data() {
    return {
      id: "",
      pw: "",

      focusBtn: false,
      active__id: false,
      error_id: false,
      active__pw: false,
      error_pw: false,

      singIn: true,

      error_message: ""
    }
  },
  methods: {
    async login() {
      try {
        if(this.focusBtn === true) {
          this.singIn= false;
          const res = await axios({
            url: 'http://localhost:8000/login',
            method: 'POST',
            data: {
              email: this.id,
              pw: this.pw
            }
          }) 
          console.log(res);
          if(res.data.message) {
            this.error_message = res.data.message;
          } else {
            this.error_message = "";
            // 클라 -> 쿠키에 데이터 저장(중복저장 불가능)
            // 하루마다 쿠키값 삭제후 -> 서버에 요청할떄 클라 쿠키값이 있다면 -> 그 쿠키값으로 세션값 가져오고, 쿠키값이 삭제되었다면 서버에서 세션재생성하여 보내준다 -> 그걸 클라에 쿠키로 저장한다
            this.$cookies.set('email', res.data.session.email);
            this.$cookies.set('name', res.data.session.name);
            this.$cookies.set('nickname', res.data.session.nickname);
            this.$cookies.config("7d");
            this.$router.push('/');
          }
          this.singIn = true;
          // 로그인 성공 -> 메인페이지 이동
          // this.$router.push('/')
        }
      } catch(e) {
        console.log(e)
      }
    },
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
      if(this.id !== "" && this.error_id === false && this.pw !== "" && this.error_pw === false) {
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
    'pw': function() {
      this.pw_error_check()
    }
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
  <div class="login" ref="document">
    <div class="inner">
      <div class="hd__login">
        <div class="__loginBox">
          <div class="__loginInner">
            <div class="__title">Instagram</div>
            <div class="__loginInfo">
              <div class="__id" @click="label_event_id($event)">
                <label :class="{ active__id }" for="id" class="id__label">전화번호, 사용자 이름 또는 이메일</label>
                <input type="text" id="id" v-model="id" @keydown.tab="label_event_pw($event)" />
                <p v-show="error_id" class="error__id">이메일 주소를 정확히 입력해주세요</p>
              </div>
              <div class="__pw" @click="label_event_pw($event)">
                <label :class="{ active__pw }" for="pw" class="pw__label">비밀번호</label>
                <input type="password" id="pw" v-model="pw" @keydown.enter="login()" />
                <p v-show="error_pw" class="error__pw">비밀번호를 정확히 입력해주세요</p>
              </div>
            </div>
            <div class="__loginBtn">
              <button :class="{ focusBtn }" @click="login()">로그인</button>
            </div>
            <div class="__of">
              <div class="__left"></div>
              <div class="__content">또는</div>
              <div class="__right"></div>
            </div>
            <div class="__etcBox ">
              <div class="__facebookLogin" @click="FBLoginBtn()"><span><i class="fa-brands fa-square-facebook"></i></span>Facebook으로 로그인</div>
              <div class="__errorMessage">{{ error_message }}</div>
              <div class="__errorPw">비밀번호를 잊으셨나요?</div>
            </div>
          </div>
        </div>
      </div>
      <div class="ft__regster">
        <div class="__text">계정이 없으신가요? <RouterLink to="/regster">가입하기</RouterLink></div>
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
    max-width: 350px;
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
          width: 85%;
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
              &:active {
                box-shadow: inset -.3rem -.1rem 1.4rem  rgb(0, 100, 200), inset .3rem .4rem .8rem rgb(0, 149, 246); 
              }
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
            .__errorMessage {
              color: red;
              font-size: 15px;
              margin-top: 1.5rem;
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


// tablet
@media screen and (max-width: 1200px) {

}

// mobile
@media screen and (max-width: 760px) {

}
</style>