<script>
export default {

}
</script>


<template>
  <div class="footer">
    <div class="__text">
      <div class="__item">Meta</div>
      <div class="__item">소개</div>
      <div class="__item">블로그</div>
      <div class="__item">채용 정보</div>
      <div class="__item">도움말</div>
      <div class="__item">API</div>
      <div class="__item">개인정보처리방침</div>
      <div class="__item">약관</div>
      <div class="__item">인기 계정</div>
      <div class="__item">해시태그</div>
      <div class="__item">위치</div>
      <div class="__item">Instagram Lite</div>
      <div class="__item">연락처 업로드 & 비사용자</div>
    </div>
    <div class="__name">
      <div class="__lang">한국어<span><i class="fa-solid fa-angle-down"></i></span></div>
      <div class="__data">© 2022 Instagram from Meta</div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
  .footer {
    max-width: 1000px;
    width: 100%;
    height: 15vh;
    margin: auto;
    padding-top: 2rem;
    box-sizing: border-box;
    .__text {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      font-size: 12px;
      margin-left: auto;
      color: #333;
      .__item {
        margin-left: 1rem;
        &:first-child {
          margin-left: 0;
        }
      }
    }
    .__name {
      padding-top: 2rem;
      font-size: 12px;
      color: #333;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .__lang {
        span {
          margin-left: 5px;
        }
      }
      .__data {
        margin-left: 1rem;
      }
      
    }
  }
</style>