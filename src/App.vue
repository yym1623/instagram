<script>
// 처음엔 login 컴포넌트만 보이게 하고 나머지 display none처리하여 로그인 성공하면 디비쪽에 해당 아이디로 접속기록이 있다면 mounted로 login 컴포넌트와 나머지의 display를 바꿔치기하여 보여준다
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Header,
    Footer,
  },
  mounted() {
    // cookie값이 없을경우에만 로그인으로 이동 있다면 해당페이지에서 동작하게 한다
    if(!this.$cookies.get('email')) {
      this.$router.push('/login');
    }
  }
}
</script>


<template>
  <div class="instagram">
    <Header v-if="this.$cookies.get('email')" />
    <RouterView />
    <Footer v-if="!this.$cookies.get('email')"/>
  </div>
</template>


<style lang="scss" scoped>
  .instagram {
    background-color: rgb(250, 250, 250);
  }
</style>