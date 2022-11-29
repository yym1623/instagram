<script>
export default {
  data() {
    return {
      display: 0,

      user_display: false,

      tablet_display: false,
      mobile_display: false,

      nickname: this.$cookies.get('nickname'),
      name: this.$cookies.get('name'),
    }
  },
  methods: {
    // router -> 동적값 전달할땐 클릭이벤트로 한단 -> 아니면 요소자체에 RouterLink로
    myPage(nickname) {
      this.$router.push({
        name: 'User',
        params: {
          id : nickname
        }
      })
    }
  },
  computed: {
    displaySize() {
      return window.onresize  = ((e) => {
        if(window.innerWidth > 1200) {
          this.tablet_display = false;
          this.mobile_display = false;
        } else if(window.innerWidth < 1200 && window.innerWidth >= 768) {
          this.tablet_display = true;
          this.mobile_display = false;
        } else if(window.innerWidth <= 767) {
          this.mobile_display = true;
          this.tablet_display = false;
        }
        return this.display = window.innerWidth;
        
      })
    },
    userDisplay() {
      if(this.$route.name === "User") {
        this.user_display = true;
      } else {
        this.user_display = false;
      }
      console.log(this.user_display)
      console.log(this.$route.name)
    }
  },
  watch: {
    displaySize(e) {
      e = window.innerWidth;
    },
    // 실시간 반응은 computed -> watch 조합이 편하단
    userDisplay(e) {

    }
  },
  mounted() {
    // display 크기에 따라 요소가 변해야 한다면 이렇게 window크기를 구해서 넣어줘도 되지만, css만 변경이라면 미디어 쿼리를 사용해도 무방하다
    this.display = window.innerWidth;
    if(window.innerWidth > 1200) {
      this.tablet_display = false;
      this.mobile_display = false;
    } else if(window.innerWidth < 1200 && window.innerWidth >= 768) {
      this.tablet_display = true;
      this.mobile_display = false;
    } else if(window.innerWidth <= 767) {
      this.mobile_display = true;
      this.tablet_display = false;
    }
  }
}
</script>


<template>
  <div class="header">
    <div class="first__header" v-if="display <= 760 && user_display === true">
      <div class="__title"><i class="fa-solid fa-gear"></i></div>
      <div class="__icon">
        <i class="fa-solid fa-user-plus"></i>
      </div>
    </div>
    <div class="first__header" v-else-if="display <= 760">
      <RouterLink to="/" class="__title">Instagram</RouterLink>
      <RouterLink to="/message" class="__icon">
        <i class="fa-regular fa-paper-plane"></i>
      </RouterLink>
    </div>
    <div class="second__header">
      <div class="menu">
        <RouterLink to="/" class="__title">
          <span v-if="display > 1200">Instagram</span>
          <span v-else><i class="fa-brands fa-instagram"></i></span>
        </RouterLink>
        <div class="__menuItem">
          <RouterLink to="/" class="__item __home">
            <!-- icon hover -> 색변동 대기 -->
            <div class="__icon"><i class="fa-solid fa-house"></i></div>
            <div class="__text">홈</div>
          </RouterLink>
          <div class="__item __search">
            <div class="__icon"><i class="fa-solid fa-magnifying-glass"></i></div>
            <div class="__text">검색</div>
          </div>
          <RouterLink to="/explore" class="__item __quest">
            <div class="__icon"><i class="fa-regular fa-compass"></i></div>
            <div class="__text">탐색 탭</div>
          </RouterLink>
          <RouterLink to="/message" class="__item __message">
            <div class="__icon"><i class="fa-regular fa-paper-plane"></i></div>
            <div class="__text">메세지</div>
          </RouterLink>
          <div class="__item __notice">
            <div class="__icon">
              <i v-if="display <= 760" class="fa-regular fa-square-plus"></i>
              <i v-else class="fa-regular fa-heart"></i>
            </div>
            <div class="__text">알림</div>
          </div>
          <div class="__item __make">
            <div class="__icon">
              <i v-if="display <= 760" class="fa-regular fa-heart"></i>
              <i v-else class="fa-regular fa-square-plus"></i>
            </div>
            <div class="__text">만들기</div>
          </div>
          <div class="__item __myinfo" @click="myPage(nickname)">
            <div class="__icon"><i class="fa-regular fa-user"></i></div>
            <div class="__text">프로필</div>
          </div>
        </div>
        <div class="__plusMenu">
          <div class="__icon"><i class="fa-solid fa-bars"></i></div>
          <div class="__text">더보기</div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

* {
  color: #000;
  text-decoration: none;
}

.header {
  .second__header {
    position: fixed;
    width: 335px;
    height: 100vh;
    // top: 0;
    // left: 0;
    bottom: 0;
    padding: 8px 12px 20px;
    z-index: 10;
    box-sizing: border-box;
    background: #fff;
    border-right: 1px solid rgb(219, 219, 219);
    .menu {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      .__title {
        font-family: 'Lobster', cursive;
        height: 60px;
        font-size: 28px;
        padding: 30px 12px 0px;
        transition: .2s;
        span {
          cursor: pointer;
        }
      }
      .__menuItem {
        flex-grow: 1;
        .__item {
          display: flex;
          align-items: center;
          padding: 12px;
          margin: 15px 0;
          transition: .2s;
          cursor: pointer;
          .__icon {
            font-size: 23px;
            transition: .2s;
          }
          .__text {
            padding-left: 20px;
          }
          &:hover {
            background: rgb(250, 250, 250);
            border-radius: 20px;
            transition: .2s;
            .__icon {
              transform: scale(1.1);
              transition: .2s;
            }
          }
        }
      }
      .__plusMenu {
        display: flex;
        align-items: center;
        padding: 12px;
        margin: 15px 0;
        transition: .2s;
        cursor: pointer;
        .__icon {
          font-size: 23px;
          transition: .2s;
        }
        .__text {
          padding-left: 20px;
        }
        &:hover {
          background: rgb(250, 250, 250);
          border-radius: 20px;
          transition: .2s;
          .__icon {
            transform: scale(1.1);
            transition: .2s;
          }
        }
      }
    }
  }
}

// pc2 ->>
@media screen and (max-width: 1700px) {
  .header {
    .second__header {
      width: 245px;
    }
  }
}

// tablet
@media screen and (max-width: 1200px) {
  .header {
    .second__header {
      width: 72px;
      .menu {
        .__title {
          transition: .2s;
          margin: 30px 0px 0px;
          padding: 0;
          span {
            padding: 12px;
            i {
              transition: .2s;
            }
            &:hover {
              background: rgb(250, 250, 250);
              border-radius: 20px;
              transition: .2s;
              i {
                transform: scale(1.1);
                transition: .2s;
              }
            }
          }
        }
        .__menuItem {
        flex-grow: 1;
        display: block;
        .__item {
          display: flex;
          align-items: center;
          padding: 12px;
          margin: 15px 0;
          transition: .2s;
          cursor: pointer;
          .__icon {
            font-size: 23px;
            transition: .2s;
          }
          .__text {
            display: none;
          }
          &:hover {
            background: rgb(250, 250, 250);
            border-radius: 20px;
            transition: .2s;
            .__icon {
              transform: scale(1.1);
              transition: .2s;
            }
          }
        }
      }
        
        .__plusMenu {
          .__text {
            display: none;
          }
        }
      }
    }
  }
}

// mobile
@media screen and (max-width: 760px) {
  .header {
    .first__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgb(219, 219, 219);
      padding: 0 16px;
      height: 60px;
      .__title {
        font-family: 'Lobster', cursive;
        font-size: 27px;
        cursor: pointer;
        &:hover {
          transform: scale(1.1);
          transition: .2;
        }
      }
      .__icon {
        font-size: 23px;
        transition: .2;
        cursor: pointer;
        &:hover {
          transform: scale(1.1);
          transition: .2;
        }
      }
    }
    .second__header {
      width: 100%;
      height: auto;
      bottom: 0;
      padding: 0;
      border-right: none;
      border-top: 1px solid rgb(219, 219, 219);
      .menu {
        display: flex;
        flex-direction: row;
        .__title {
          display: none;
        }
        .__menuItem {
          display: flex;
          justify-content: space-evenly;
          .__item {
            margin: 0;
            &:hover {
              background: none;
            }
          }
          .__item:nth-child(3) {
            display: none;
          }
          .__item:nth-child(4) {
            display: none;
          }
        }
        .__plusMenu {
          display: none;
        }
      }
    }
  }
}
</style>