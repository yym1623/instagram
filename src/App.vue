<script>
// 처음엔 login 컴포넌트만 보이게 하고 나머지 display none처리하여 로그인 성공하면 디비쪽에 해당 아이디로 접속기록이 있다면 mounted로 login 컴포넌트와 나머지의 display를 바꿔치기하여 보여준다
import Footer from './components/Footer.vue'
export default {
  components: {
    Footer
  },
}
</script>


<template>
  <div class="instagram">
    <!-- 로그인 정보가 있다면 Login 컴포넌트 제거 -> 없다면 라우터페이지 제거 -->
    <RouterView />
    <Footer />
  </div>
</template>


<style lang="scss" scoped>
  .instagram {
    background-color: rgb(250, 250, 250);
  }
</style>