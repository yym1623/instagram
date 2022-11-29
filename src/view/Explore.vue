<script>
export default {

}
</script>

<template>
  <div class="explore">
    <div class="inner">
      <div class="gd">
        <!-- test item (30) -->
        <div class="__item"></div>
        <div class="__item"></div>
        <div class="__item"></div>
        <div class="__item"></div>
        <div class="__item"></div>
        <div class="__item"></div>
        <div class="__item"></div>
        <div class="__item"></div>
        <div class="__item"></div>
        <div class="__item"></div>
        <div class="__item"></div>
        <div class="__item"></div>
        <div class="__item"></div>
        <div class="__item"></div>
        <div class="__item"></div>
        <div class="__item"></div>
        <div class="__item"></div>
        <div class="__item"></div>
        <div class="__item"></div>
        <div class="__item"></div>
        <div class="__item"></div>
        <div class="__item"></div>
        <div class="__item"></div>
        <div class="__item"></div>
        <div class="__item"></div>
        <div class="__item"></div>
        <div class="__item"></div>
        <div class="__item"></div>
        <div class="__item"></div>
        <div class="__item"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.explore {
  position: static;
  width: calc(100% - 335px);
  // 처음 예시로 정할때만 사용 -> 값이 늘어나서 해당값을 초과하면 디자인이 꺠진단 - min이면 상관없다
  min-height: 100vh;
  margin-left: auto;
  background: rgb(250, 250, 250);
  padding: 20px;
  box-sizing: border-box;
  .inner {
    width: 100%;
    max-width: 963px;
    // height: 100vh;
    height: 100%;
    margin: auto;
    .gd {
      display: grid;
      gap: 30px;
      height: 100%;
      grid-template-columns: repeat(3, 1fr);
      .__item {
        // max로 지정하고 100%로 두단계로주면 max까지 100%늘어나는게 아닌가? -> 맞다 그런데 상위부모에 지정된 height만큼 현 요소 부모에다 height 100%든 뭐든 할당을해야 그 자식요소가 그만큼 잡을 수 있단
        max-width: 300px;
        max-height: 300px;
        width: 100%;
        aspect-ratio: 1 / 1; // 정사각형? 유지할때 좋단 -> 근데 유지만되고 반응성(디스플레이에 맞게 줄어드는 거)이 없는거 같다 -> 일단 보류
        height: auto;
        background: #fff;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
      }
    }
  }
}

// pc 2 ->>
@media screen and (max-width: 1700px) {
  .explore {
    position: static;
    width: calc(100% - 245px);
  }
}

  // tablet - 1024, mobile - 760이 평균인데 instagram에 맞춰서 tablet - 1250, mobile - 760으로 해본다 (페이지마다 조금씩 차이가 있단)
  // tablet
@media screen and (max-width: 1200px) {
  .explore {
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
    }
  }
}

// mobile
@media screen and (max-width: 760px) {
  .explore {
    position: fixed;
    top: 0;
    width: 100%;
    margin: auto;
    padding: 0;
    .inner {
      height: 100vh;
      .gd {
        display: grid;
        gap: 10px;
        height: 100%;
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
}

// mobile2 ->>
@media screen and (max-width: 660px) {
  .explore {
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