<script>
export default {

}
</script>


<template>
  <div class="home">
    <div class="menu"></div>
  </div>
</template>


<style lang="scss" scoped>
  .home {
    width: calc(100% - 250px);
    height: 100vh;
    margin-left: auto;
    background: rgb(250, 250, 250);
    .menu {
      background: blue;
      width: 830px;
      height: 100%;
      margin: auto;
      
    }
  }

  // tablet - 1024, mobile - 760이 평균인데 instagram에 맞춰서 tablet - 1250, mobile - 760으로 해본다 (페이지마다 조금씩 차이가 있단)
  // tablet
  @media screen and (max-width: 1200px) {

  }
  
  // mobile
  @media screen and (max-width: 760px) {

  }
</style>