<script>
export default {

}
</script>


<template>
  <div class="header">
    <div class="menu">
      <div class="__title">Instagram</div>
      <div class="__menuItem __home">
        <div class="__icon"><i class="fa-solid fa-house"></i></div>
        <div class="__text">홈</div>
      </div>
      <div class="__menuItem __search">
        <div class="__icon"><i class="fa-solid fa-magnifying-glass"></i></div>
        <div class="__text">검색</div>
      </div>
      <div class="__menuItem __quest">
        <div class="__icon"><i class="fa-regular fa-compass"></i></div>
        <div class="__text">탐색 탭</div>
      </div>
      <div class="__menuItem __message">
        <div class="__icon"><i class="fa-sharp fa-solid fa-paper-plane"></i></div>
        <div class="__text">메세지</div>
      </div>
      <div class="__menuItem __notice">
        <div class="__icon"><i class="fa-regular fa-heart"></i></div>
        <div class="__text">알림</div>
      </div>
      <div class="__menuItem __make">
        <div class="__icon"><span class="material-symbols-outlined">add_box</span></div>
        <div class="__text">만들기</div>
      </div>
      <div class="__menuItem __myinfo">
        <div class="__icon"><i class="fa-regular fa-user"></i></div>
        <div class="__text">프로필</div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

  .header {
    position: fixed;
    width: 250px;
    height: 100vh;
    top: 0;
    left: 0;
    padding: 20px;
    z-index: 10;
    box-sizing: border-box;
    background: #fff;
    border-right: 1px solid #eee;
    .menu {
      height: 100%;
      width: 100%;
      .__title {
        font-family: 'Lobster', cursive;
        
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