<script>
import axios from 'axios'
export default {
  data() {
    return {
      display: 0,

      data: "",
      searchData: "",
      searchData_ch: false,
      search_loding: false,

      user_display: false,

      tablet_display: false,
      mobile_display: false,

      sample_img: false,
      isDragged: false,

      make_text: "",

      nickname: this.$cookies.get('nickname'),
      name: this.$cookies.get('name'),

      // file 여러개 가능하게 한단 -> 배열
      fileList: [],
      files: [],
      files_name: "",

      // home, search, plusMenu 3가지는 안먹힌다 (나중에 교체한다)
      home_ch: false,
      search_ch: false,
      quest_ch: false,
      message_ch: false,
      notice_ch: false,
      make_ch: false,
      myinfo_ch: false,
      plusMenu_ch: false,
      success_img: false,

      searchBox_ch: false,
      open_data: false,
      noticeBox_ch: false,
      notice_loding: false,
      makeBox_ch: false,

      user_sample: [
        {"name":"kmackin0","nickname":"Kyle","profile":"https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/554/3e05578b1ed635fdf852fd89e3c6fef8_res.jpeg"},
        {"name":"lwickendon1","nickname":"Lilas","profile":"https://sungyesa.com/new/data/file/free/3699079233_vdoEG2zY_2523666B-52A6-4DD7-B32F-0C6D8FDE8D1F.jpeg"},
        {"name":"tcotillard2","nickname":"Tiebold","profile":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5fx7465mV30augpIMD5pFNa2BWLNXWrp4uA&usqp=CAU"},
        {"name":"cchsteney3","nickname":"Cordelia","profile":"https://images-kr.girlstyle.com/wp-content/uploads/2018/11/0000223371_001_20180810115738536.jpg"},
        {"name":"jblakesley4","nickname":"Joscelin","profile":"https://img.hankyung.com/photo/201811/01.18271154.1.jpg"},
        {"name":"rkirdsch5","nickname":"Robin","profile":"https://cdn.bokjitimes.com/news/photo/202002/22767_15736_3416.jpg"},
        {"name":"mcaillou6","nickname":"Merrilee","profile":"https://cdnweb01.wikitree.co.kr/webdata/editor/202203/09/img_20220309153631_bc511c9b.webp"},
        {"name":"slascell7","nickname":"Shelli","profile":"https://post-phinf.pstatic.net/MjAyMDEwMDhfMjU2/MDAxNjAyMTIzNjM5ODg1.jNBL7Kroe6kBSd8iL0D9gM4V516CBXZnUHFb-TBxIyIg.F1uXH4b7WuibteVcCmG-vZLniM5DrJzs2OCkqztuZnog.JPEG/%EA%B2%A8%EC%9A%B8_%EB%A9%94%EC%9D%B8%EC%BB%B7.jpg?type=w1200"},
        {"name":"dsedcole8","nickname":"Duffie","profile":"https://img9.yna.co.kr/photo/cms/2019/02/01/81/PCM20190201000081005_P2.jpg"},
        {"name":"rgranger9","nickname":"Reginauld","profile":"http://image.newsis.com/2022/10/31/NISI20221031_0001117996_web.jpg"},
        {"name":"irodbournea","nickname":"Isahella","profile":"https://images.chosun.com/resizer/C6ad4fbBBVwyUdn6ziRBR_VEkL8=/616x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/2R24FEZO6VFKNHJKND4FGETXVY.JPG"},
        {"name":"alamberteschib","nickname":"Auguste","profile":"http://dummyimage.com/118x100.png/ff4444/ffffff"},
        {"name":"glubeckc","nickname":"Garrick","profile":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT05FKRbwYdbvIz_7q6yf_3Oevdk6NIoPIFrA&usqp=CAU"},
        {"name":"wrannsd","nickname":"Waldo","profile":"https://newsimg-hams.hankookilbo.com/2022/10/06/c041ec67-565b-459d-a8e9-bb8e6a2e33b2.jpg"},
        {"name":"cbiaggellie","nickname":"Cristiano","profile":"https://img.etoday.co.kr/pto_db/2020/06/20200621122424_1474938_466_568.jpg"}
      ],

      search_user_sample: [],
      
    }
  },
  methods: {
    // router -> 동적값 전달할땐 클릭이벤트로 한단 -> 아니면 요소자체에 RouterLink로
    // 여러 버튼에 따라 다르게 보내고싶으면 인자를 주어 각각 주면 된단
    myPage(nickname, name) {
      this.$router.push({
        name: 'User',
        params: {
          id : nickname,
          name : name
        }
      })
      // this.$router.go();
      this.searchBox_ch = false;
      this.noticeBox_ch = false;
    },
    async logOut() {
      try {
        const res = await axios({
          url: 'http://localhost:8000/logout',
          method: 'GET',
          data: {
            email: this.$cookies.get('email'),
            name : this.$cookies.get('name'),
            nickname: this.$cookies.get('nickname'),
          }
        })
        console.log(res);

        // 현재 -> 회원가입하면 db에 세션저장, 따로 클라엔 쿠키로 저장, 로그아웃하면 클라 쿠키 삭제후 db세션 삭제, 따로따로 되고 db세션하고 연결되있지가 않다 -> 나중에 맞춰주잔
        this.$cookies.remove('email');
        this.$cookies.remove('name');
        this.$cookies.remove('nickname');
        
        this.$router.go();
      } catch(e) {
        console.error(e)
      }
    },
    search_filter(e) {
      this.search_loding = true;
      if(e.target.value.length > 0) {
        this.search_user_sample = this.user_sample.filter((user) => user.name.includes(e.target.value));
        if(this.search_user_sample.length > 0) {
          this.searchData_ch = true;
        } else {
          this.searchData_ch = false;
        }
      } else {
        this.search_user_sample = [];
        this.searchData_ch = false;
      }
      this.search_loding = false;
    },
    // drop options
    onDragenter (event) {
      // class 넣기
      this.isDragged = true
    },
    onDragleave (event) {
      // class 삭제
      this.isDragged = false
    },
    // click, drop 인자로 구분하여 하나로 합쳐서 사용한단
    upload(e) {
      const files = e;
      // 함수가 다르면서 함수에다 함수를 연속 실행할 수 없는 경우엔 평범하게 데이터선언해서 값을준다음 넘겨서 재사용하면 된단
      this.files = files[0];
      this.files_name = files[0].name;
      this.addFiles(files)
      // 데이터 선언해서 this로 넣고 사용해도 상관없지만 잠깐 사용하고 하는거면 해당 함수에 변수사용해서 하는거도 괜찮단
      // let droppedFiles = e.dataTransfer.files;
      // if (!droppedFiles) return;
      // vue에선 변수도 많이 사용한단 꼭 할당한 데이터에만 넣는 vue방식만이 아닌
      // 메소드안에서 this로 메소드를 참조하여 인자도 넘길 수 있단
    },
    // 파라미터로 넘어온 파일 객체를 읽고 fileList 배열에 추가한다
    async addFiles (files) {
      for(let i = 0; i < files.length; i++) {
        const src = await this.readFiles(files[i])
        files[i].src = src
        this.fileList.push(files[i])
      }
      if(this.fileList.length > 0) {
        this.sample_img = true;
      } else {
        this.sample_img = false;
      }
    
    },
    // FileReader를 통해 파일을 읽어 thumbnail 영역의 src 값으로 셋팅
    async readFiles (files) {
      // file로 넘겨받은 img를 src같은 주소로 보여주기위해선 FileReader로 img를 데이터 url로 변환해야 보여줄 수 있단
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = async (e) => {
          resolve(e.target.result) 
        }
        reader.readAsDataURL(files)
      })
    },
    async make_share() {
      try {
        // 파일을 전송할때는 FormData 형식으로 전송하잔
        const formData = new FormData();
        // multer부분의 single()안의 이름과 파일자체인 즉 파일명 이름과 매칭시켜야 req.file에 들어간다(body포함이 아니니 body에 넣을껀 따로 넣고 file에 넣을꺼만 file명 매칭하면 된다)
        formData.append("myfile", this.files);
        formData.append("email",this.$cookies.get('email'));
        formData.append("name",this.$cookies.get('name'));
        formData.append("nickname",this.$cookies.get('nickname'));
        formData.append("write", this.make_text);
        const res = await axios.post('http://localhost:8000/make',formData)
        console.log(res)
        if(res.data.message === "업로드완료") {
          this.sample_img = false;
          this.success_img = true;
          // 어차피 메인에서 mounted로 조회해서 가져올거라 여기선 가져올 필욘없다 -> 성공여부만 확인하잔(어차피 새로고침으로 없어져서)
          setTimeout(() => {
            this.$router.go()
          },2000)
        }
      // axios에서 catch로 예외처리못한대신 함수전체를 try, catch로 묶어서 할순있다 -> await이 더 편하곤
      } catch(e) {
        console.log(e)
      }
    },
    make_back() {
      this.sample_img = false;
      this.fileList = [];
    },
    homeBtn() {
      this.home_ch = true;
      this.search_ch = false;
      this.searchBox_ch = false;
      this.quest_ch = false;
      this.message_ch = false;
      this.notice_ch = false;
      this.noticeBox_ch = false;
      this.make_ch = false;
      this.myinfo_ch = false;
      this.plusMenu_ch = false;
      this.open_data = false;
      this.makeBox_ch = false;
    },
    searchBtn() {
      this.home_ch = false;
      this.search_ch = true;
      this.searchBox_ch = !this.searchBox_ch;
      this.quest_ch = false;
      this.message_ch = false;
      this.notice_ch = false;
      this.noticeBox_ch = false;
      this.make_ch = false;
      this.myinfo_ch = false;
      this.plusMenu_ch = false;
      this.open_data = false;
      this.makeBox_ch = false;
    },
    questBtn() {
      this.home_ch = false;
      this.search_ch = false;
      this.searchBox_ch = false;
      this.quest_ch = true;
      this.message_ch = false;
      this.notice_ch = false;
      this.noticeBox_ch = false;
      this.make_ch = false;
      this.myinfo_ch = false;
      this.plusMenu_ch = false;
      this.open_data = false;
      this.makeBox_ch = false;
    },
    messageBtn() {
      this.home_ch = false;
      this.search_ch = false;
      this.quest_ch = false;
      this.message_ch = true;
      this.notice_ch = false;
      this.searchBox_ch = false;
      this.noticeBox_ch = false;
      this.make_ch = false;
      this.myinfo_ch = false;
      this.plusMenu_ch = false;
      this.plusMenu_ch = false;
      this.open_data = false;
      this.makeBox_ch = false;
    },
    noticeBtn() {
      this.notice_loding = true;
      this.home_ch = false;
      this.search_ch = false;
      this.searchBox_ch = false;
      this.quest_ch = false;
      this.message_ch = false;
      this.notice_ch = true;
      this.noticeBox_ch = !this.noticeBox_ch;
      if(this.noticeBox_ch) {
        this.notice_loding = false;
      }
      this.make_ch = false;
      this.myinfo_ch = false;
      this.plusMenu_ch = false;
      this.open_data = false;
      this.makeBox_ch = false;
    },
    makeBtn() {
      this.home_ch = false;
      this.search_ch = false;
      this.quest_ch = false;
      this.message_ch = false;
      this.notice_ch = false;
      this.noticeBox_ch = false;
      this.make_ch = true;
      this.myinfo_ch = false;
      this.plusMenu_ch = false;
      this.open_data = false;
      this.makeBox_ch = !this.makeBox_ch;
    },
    myinfoBtn() {
      this.home_ch = false;
      this.search_ch = false;
      this.searchBox_ch = false;
      this.quest_ch = false;
      this.message_ch = false;
      this.notice_ch = false;
      this.noticeBox_ch = false;
      this.make_ch = false;
      this.myinfo_ch = true;
      this.plusMenu_ch = false;
      this.open_data = false;
      this.makeBox_ch = false;
    },
    plusMenuBtn() {
      this.home_ch = false;
      this.search_ch = false;
      this.searchBox_ch = false;
      this.quest_ch = false;
      this.message_ch = false;
      this.notice_ch = false;
      this.noticeBox_ch = false;
      this.make_ch = false;
      this.myinfo_ch = false;
      this.plusMenu_ch = !this.plusMenu_ch;
      this.open_data = false;
      this.makeBox_ch = false;
    },
    close_Search() {
      this.searchBox_ch = false;
    },
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
    },
    openData() {
      if(this.searchBox_ch || this.noticeBox_ch) {
        this.open_data = true;
      } else {
        this.open_data = false;
      }
    }
  },
  watch: {
    displaySize(e) {
      e = window.innerWidth;
    },
    // 실시간 반응은 computed -> watch 조합이 편하단
    userDisplay(e) {

    },
    openData() {

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
    <div class="second__header" :class="{ searchBox_ch, noticeBox_ch }">
      <div class="menu">
        <RouterLink to="/" class="__title">
          <span v-if="display > 1260 && !open_data" @click="homeBtn()">Instagram</span>
          <span v-else @click="homeBtn()"><i class="fa-brands fa-instagram"></i></span>
        </RouterLink>
        <div class="__menuItem">
          <RouterLink to="/" class="__item __home" @click="homeBtn()" :class="{ home_ch }">
            <!-- icon hover -> 색변동 대기 -->
            <div class="__icon"><i class="fa-solid fa-house"></i></div>
            <div class="__text" ref="text">홈</div>
          </RouterLink>
          <div class="__item __search"  @click="searchBtn()" :class="{ search_ch }">
            <div class="__icon"><i class="fa-solid fa-magnifying-glass"></i></div>
            <div class="__text" ref="text">검색</div>
          </div>
          <RouterLink to="/explore" class="__item __quest" @click="questBtn()" :class="{ quest_ch }">
            <div class="__icon"><i class="fa-regular fa-compass"></i></div>
            <div class="__text" ref="text">탐색 탭</div>
          </RouterLink>
          <RouterLink to="/message" class="__item __message" @click="messageBtn()" :class="{ message_ch }">
            <div class="__icon"><i class="fa-regular fa-paper-plane"></i></div>
            <div class="__text" ref="text">메세지</div>
          </RouterLink>
          <div class="__item __notice" @click="noticeBtn()" :class="{ notice_ch }">
            <div class="__icon">
              <i v-if="display <= 760" class="fa-regular fa-square-plus"></i>
              <i v-else class="fa-regular fa-heart"></i>
            </div>
            <div class="__text" ref="text">알림</div>
          </div>
          <div class="__item __make" @click="makeBtn()" :class="{ make_ch }">
            <div class="__icon">
              <i v-if="display <= 760" class="fa-regular fa-heart"></i>
              <i v-else class="fa-regular fa-square-plus"></i>
            </div>
            <div class="__text" ref="text">만들기</div>
          </div>
          <div class="__item __myinfo" @click="myPage(nickname, name), myinfoBtn()" :class="{ myinfo_ch }">
            <div class="__icon"><i class="fa-regular fa-user"></i></div>
            <div class="__text" ref="text">프로필</div>
          </div>
        </div>
        <div class="__plusMenu" @click="plusMenuBtn()">
          <div class="__icon"><i class="fa-solid fa-bars"></i></div>
          <div class="__text" ref="text">더보기</div>
          <!-- 더보기박스 -->
          <div class="plusMenu" :class="{ plusMenu_ch }">
            <div class="plus__item">
              <div class="plus__text">설정</div>
              <div class="plus__icon"><i class="fa-solid fa-gear"></i></div>
            </div>
            <div class="plus__item">
              <div class="plus__text">저장됨</div>
              <div class="plus__icon"><i class="fa-regular fa-bookmark"></i></div>
            </div>
            <div class="plus__item">
              <div class="plus__text">문제 신고</div>
              <div class="plus__icon"><span class="material-symbols-outlined">live_help</span></div>
            </div>
            <div class="plus__item">계정 전환</div>
            <div class="plus__item" @click="logOut()">로그아웃</div>
          </div>
        </div>
      </div>
      <!-- search Box -->
      <div class="searchBox" :class="{ searchBox_ch }">
        <div class="search__titleBox">
          <div class="search__title">검색</div>
          <div class="search__input">
            <!-- search type을 하면 글을 적을땐 우측상단에 지우기 버튼이 생긴단 -->
            <input type="search" placeholder="검색" v-model="data" @input="search_filter($event)">
            <!-- 나중에 수정하잔 -> pc버전으로 옆으로 나오는거 모바일에선 위로나오게 -->
            <div class="search__close" v-if="display < 760" @click="close_Search()"><i class="fa-solid fa-xmark"></i></div>
          </div>
        </div>
        <!-- searching -->
        <div class="search__list" v-if="!searchData_ch">
          <div class="list__title">최근 검색 항목</div>
          <div class="list__box">최근 검색 내역 없음</div>
        </div>
        <div class="search__list" v-else-if="search_loding">
          <div class="list__title"></div>
          <div class="list__box">
            <img src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif" alt="">
          </div>
        </div>
        <div class="search__list" v-else>
          <div class="search__user" v-for="user in search_user_sample" :key="user" @click="myPage(user.nickname, user.name)">
            <img :src="user.profile" class="__myImg" />
            <div class="__myData">
              <div class="__nickname">{{ user.nickname }}</div>
              <div class="__name">{{ user.name }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- notice Box -->
      <div class="noticeBox" :class="{ noticeBox_ch }">
        <div class="notice__titleBox">
          <div class="notice__title">알림</div>
          <div class="notice__today">
            <div class="__today">오늘</div>
            <div class="__todayUser" @click="myPage(nickname, name)">
              <div class="__myImg"></div>
              <div class="__myData">
                <div class="__nickname">{{ nickname }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="notice__list" v-if="notice_loding">
          <div class="list__title"></div>
          <div class="list__box">
            <img src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif" alt="">
          </div>
        </div>
        <div class="notice__list" v-else>
          <div class="__lee">이번주</div>
          <div class="notice__user" @click="myPage(nickname, name)">
            <div class="__myImg"></div>
            <div class="__myData">
              <div class="__nickname">{{ nickname }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- makeBox -->
    <div class="makeBox" :class="{ sample_img, makeBox_ch }">
      <div class="make__title" v-if="!sample_img">새 게시물 만들기</div>
      <div class="make__title plus__title" v-else>
        <div class="__turn" @click="make_back()"><i class="fa-solid fa-arrow-left"></i></div>
        <div class="__title">새 게시물 만들기</div>
        <div class="__save" @click="make_share()">공유하기</div>
      </div>
      <!-- vue - @drop options -->
      <!-- + 이벤트걸고 메소드에서 prevent거는거보단 @drop.prevent로 바로 걸어서 메소드에선 코드를 줄일 수 있단 -->
      <!-- 1. drop - file같은 input 데이터를 드래그앤 드롭으로 가능하게 해줌 - prevent를 걸면서 기본 액션을 막는다(링크 여는거 등등) -->
      <!-- 2. dragover - drop 옵션(?) - prevent를 걸면서 드롭을 허용하도록 한다 -->
      <!-- 3. dragenter - drop이 되었을때 거는 이벤트 - 드롭될때 class를 넣어 표시해 줄 수 있다 -->
      <!-- 4. dragleave - drop이 해제되었을때 거는 이벤트 - 드롭이 해제될때 class를 해제하여 표시해 줄 수 있단 -->
      <div class="make__body test__body" @drop.prevent="upload($event.dataTransfer.files)" @dragover.prevent @dragenter="onDragenter" @dragleave="onDragleave" :class="{ isDragged }" v-if="(!sample_img && !success_img)">
        <div class="body__item">
          <img src="/public/make_img.PNG" class="__item __imgItem" />
          <div class="__item __text">사진과 동영상을 여기에 끌어다 놓으세요</div>
          <div class="__item">
            <!-- label이 margin이 안먹히므로 부모로 감싸서 부모로 내려준단 -->
            <label class="__item __btn" for="file">컴퓨터에서 선택</label>
            <input class="__changeBtn" id="file" type="file" name="myfile" @change="upload($event.target.files)" />
          </div>
        </div>
      </div>
      <div class="make__body test__body" v-else-if="success_img">
        <div class="body__item">
          <img src="https://static.cdninstagram.com/rsrc.php/v3/yb/r/sHkePOqEDPz.gif" class="__item" />
          <div class="__item __text">업로드가 완료되었습니다</div>
        </div>
      </div>
      <div class="make__body" v-else>
        <div class="make__data" v-for="make in fileList" :key="make">
          <img :src="make.src" />
        </div>
        <div class="make__info">
          <div class="info__data">
            <div class="__img"></div>
            <div class="__name">{{ name }}</div>
          </div>
          <div class="info__text">
            <textarea name="" id="" cols="30" rows="10" v-model="make_text" placeholder="문구입력..."></textarea>
          </div>
          <div class="info__btn">
            <div class="btn__text">위치 추가</div>
            <div class="btn__icon firstBtn"><i class="fa-solid fa-location-dot"></i></div>
          </div>
          <div class="info__btn">
            <div class="btn__text">접근성</div>
            <div class="btn__icon"><span class="material-symbols-outlined">expand_more</span></div>
          </div>
          <div class="info__btn">
            <div class="btn__text">고급 설정</div>
            <div class="btn__icon"><span class="material-symbols-outlined">expand_more</span></div>
          </div>
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
    z-index: 100;
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
        .__item.home_ch {
          .__icon {
            i {
              font-weight: bold;
            }
          }
          .__text {
            font-weight: bold;
          }
        }
        .__item.search_ch {
          .__icon {
            i {
              font-weight: bold;
            }
          }
          .__text {
            font-weight: bold;
          }
        }
        .__item.quest_ch {
          .__icon {
            i {
              font-weight: bold;
            }
          }
          .__text {
            font-weight: bold;
          }
        }
        .__item.message_ch {
          .__icon {
            i {
              font-weight: bold;
            }
          }
          .__text {
            font-weight: bold;
          }
        }
        .__item.notice_ch {
          .__icon {
            i {
              font-weight: bold;
            }
          }
          .__text {
            font-weight: bold;
          }
        }
        .__item.make_ch {
          .__icon {
            i {
              font-weight: bold;
            }
          }
          .__text {
            font-weight: bold;
          }
        }
        .__item.myinfo_ch {
          .__icon {
            i {
              font-weight: bold;
            }
          }
          .__text {
            font-weight: bold;
          }
        }
      }
      .__plusMenu {
        position: relative;
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
        .plusMenu {
          display: none;
          position: absolute;
          bottom: 50px;
          left: 0;
          width: 238px;
          z-index: 10;
          background: #fff;
          border-radius: 10px;
          box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
          .plus__item {
            display: flex;
            align-items: center;
            padding: 8px 16px;
            box-sizing: border-box;
            height: 44px;
            border-bottom: 1px solid #eee;
            box-sizing: border-box;
            color: #262626;
            font-size: 16px;
            cursor: pointer;
            &:last-child {
              border-bottom: none;
            }
            .plus__text {
              width: 170px;
            }
            .plus__icon {
              margin: auto;
              i,span {
                font-size: 24px;
              }
            }
            &:hover {
              background: rgb(250, 250, 250);
            }
          }
        }
        .plusMenu.plusMenu_ch {
          display: block;
        }
      }
    }
    // search
    .searchBox {
      position: fixed;
      top: 0;
      // left: 0;
      transform: translateX(0%);
      transition: .5s;
      left: 74px;
      box-shadow: 4px 0 24px rgba(0,0,0,.15);
      width: 0;
      height: 100%;
      background: #fff;
      border-radius: 0 16px 16px 0;
      padding: 8px 0;
      box-sizing: border-box;
      .search__titleBox {
        display: none;
        .search__title {
          padding: 12px 14px 36px 24px;
          margin: 8px 0;
          font-size: 22px;
          color: #262626;
          font-weight: bold;
          box-sizing: border-box;
        }
        .search__input {
          margin: 0 16px 24px;
          input {
            // input에도 백그라운드 이미지를 넣을 순 있단 -> 포커스되면 삭제시키면 멋진 검색창을 만들 수 있단
            background-image: url('https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-256.png');
            background-position: 10px;
            background-size: 7%;
            text-indent: 25px;
            background-repeat: no-repeat;
            padding: 3px 16px;
            box-sizing: border-box;
            width: 364px;
            height: 40px;
            border: none;
            border-radius: 8px;
            outline: none;
            // background로 색상주면 auto로 background-color로 들어가지만 백그라운드 이미지에 의해서 겹쳐서 이미지에 문제 생길 수 있단 -> 이미지 줄땐 백그라운-color로 주자
            background-color: rgb(239, 239, 239);
            color: rgb(38, 38, 38);
            font-size: 16px;
            &:focus {
              background-image: none;
              background-position: -10px center;
              text-indent: 0;
            }
          }
        }
      }
      .search__list {
        display: none;
        width: 100%;
        height: 100%;
        padding-top: 10px;
        border-top: 1px solid rgb(219, 219, 219);
        .list__title {
          margin: 6px 24px 8px;
          font-weight: bold;
          color: #262626;
        }
        .list__box {
          width: 100%;
          height: 80%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          color: #828282;
          font-weight: bold;
          img {
            width: 35px;
            height: 35px;
          }
        }
        // search__user
        .search__user {
          display: flex;
          align-items: center;
          padding: 8px 24px;
          cursor: pointer;
          .__myImg {
            background: #eee;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            cursor: pointer;
          }
          .__myData {
            margin-left: 15px;
            .__nickname {
              font-size: 14px;
              font-weight: bold;
              color: rgb(38, 38, 38);
            }
            .__name {
              margin-top: 5px;
              font-size: 14px;
              color: rgb(142, 142, 142);
            }
          }
          &:hover {
            background: rgb(250, 250, 250);
          }
        }
      }
    }
    .searchBox.searchBox_ch {
      width: 397px;
      // left: 72px;
      // transform: translateX(0%);
      transition: all ease .5s 0s;
      // transition: .5s;
      .search__titleBox {
        display: block;
      }
      .search__list {
        display: block;
      }
    }
    // notice
    .noticeBox {
      position: fixed;
      top: 0;
      // left: 0;
      transform: translateX(0%);
      transition: .5s;
      left: 74px;
      box-shadow: 4px 0 24px rgba(0,0,0,.15);
      width: 0;
      height: 100%;
      background: #fff;
      border-radius: 0 16px 16px 0;
      padding: 8px 0;
      box-sizing: border-box;
      .notice__titleBox {
        display: none;
        .notice__title {
          padding: 16px 24px 24px;
          margin: 8px 0;
          font-size: 22px;
          color: #262626;
          font-weight: bold;
          box-sizing: border-box;
        }
        .notice__today {
          .__today {
            padding: 0 24px;
            margin-bottom: 18px;
            font-weight: bold;
          }
          .__todayUser {
            display: flex;
            align-items: center;
            padding: 8px 24px;
            cursor: pointer;
            .__myImg {
              background: #eee;
              width: 44px;
              height: 44px;
              border-radius: 50%;
              cursor: pointer;
            }
            .__myData {
              margin-left: 15px;
              .__nickname {
                font-size: 14px;
                font-weight: bold;
                color: rgb(38, 38, 38);
              }
              .__name {
                margin-top: 5px;
                font-size: 14px;
                color: rgb(142, 142, 142);
              }
            }
            &:hover {
              background: rgb(250, 250, 250);
            }
          }
        }
      }
      .notice__list {
        display: none;
        width: 100%;
        height: 100%;
        padding-top: 20px;
        border-top: 1px solid rgb(219, 219, 219);
        .list__title {
          margin: 6px 24px 8px;
          font-weight: bold;
          color: #262626;
        }
        .list__box {
          width: 100%;
          height: 80%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          color: #828282;
          font-weight: bold;
          img {
            width: 35px;
            height: 35px;
          }
        }
        .__lee {
          padding: 0 24px;
          margin-bottom: 18px;
          font-weight: bold;
        }
        .notice__user {
          display: flex;
          align-items: center;
          padding: 8px 24px;
          cursor: pointer;
          .__myImg {
            background: #eee;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            cursor: pointer;
          }
          .__myData {
            margin-left: 15px;
            .__nickname {
              font-size: 14px;
              font-weight: bold;
              color: rgb(38, 38, 38);
            }
            .__name {
              margin-top: 5px;
              font-size: 14px;
              color: rgb(142, 142, 142);
            }
          }
          &:hover {
            background: rgb(250, 250, 250);
          }
        }
      }
    }
    .noticeBox.noticeBox_ch {
      width: 397px;
      // left: 72px;
      // transform: translateX(0%);
      transition: all ease .5s 0s;
      // transition: .5s;
      .notice__titleBox {
        display: block;
      }
      .notice__list {
        display: block;
      }
    }
  }
  // makeBox
  .makeBox {
    display: none;
    transition: .3s;
    position: absolute;
    z-index: 100;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 720px;
    max-height: 760px;
    height: 100%;
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    border-radius: 12px;
    .make__title {
      font-weight: bold;
      height: 42px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #eee;
      box-sizing: border-box;
    }
    .plus__title {
      display: flex;
      justify-content: space-between;
      padding: 0 16px;
      .__turn {
        font-size: 24px;
        cursor: pointer;
      }
      .__title {

      }
      .__save {
        color: #0095F6;
        font-size: 14px;
        cursor: pointer;
      }
    }
    .make__body {
      width: 100%;
      height: calc(100% - 42px);
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      .body__item {
        text-align: center;
        .__item {
          margin-top: 15px;
          &:first-child {
            margin-top: 0;
          }
        }
        .__imgItem {
          pointer-events: none;
        }
        .__text {
          font-size: 22px;
        }
        .__btn {
          background: rgb( 0, 149, 246);
          border: 1px solid transparent;
          outline: none;
          padding: 5px 9px;
          border-radius: 5px;
          color: #fff;
          font-weight: bold;
          font-size: 14px;
          cursor: pointer;
          &:active {
            opacity: .8;
          }
        }
        .__changeBtn {
          display: none;
        }
      }
      .make__data {
        img {
          width: 100%;
        }
      }
    }
    .test__body {
      // width: 100%;
      width: auto !important;
      height: calc(100% - 82px);
      margin: 20px;
      box-sizing: border-box;
      padding: 0 !important;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .make__body.isDragged {
      border: 5px dashed rgb( 0, 149, 246);
      animation: 2s dash infinite;
      @keyframes dash {
        0% {
          border: 5px dashed rgb( 0, 100, 246);
        }
        100% {
          border: 5px dashed rgb( 0, 149, 246);
        }
      }
    }
  }
  .makeBox.makeBox_ch {
    display: block;
  }
  .makeBox.sample_img {
    width: 1058px;
    transition: .3s;
    .make__body {
      padding: 0;
      display: flex;
      .make__data {
        display: flex;
        align-items: center;
        max-width: 718px;
        width: 100%;
      }
      .make__info {
        overflow-y: scroll;
        width: calc(100% - 718px);
        height: 100%;
        border-left: 1px solid #eee;
        .info__data {
          height: 60px;
          margin: 0 16px;
          display: flex;
          align-items: center;
          .__img {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: rgb(219, 219, 219);
          }
          .__name {
            margin-left: 8px;
            font-weight: bold;
          }
        }
        .info__text {
          margin: 0 16px;
          textarea {
            font-size: 14px;
            border: none;
            outline: none;
            resize: none;
            width: 100%;
          }
        }
        .info__btn {
          padding: 14px 16px;
          // height: 45px;
          display: flex;
          align-items: center;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
          justify-content: space-between;

          .firstBtn { 
            padding-right: 6px;
            cursor: auto !important; // 밑으로 갈수록 우선순위가 높아져 캔슬된단 -> 임폴턴트
          }
          .btn__icon {
            cursor: pointer;
          }
        }
      }
    }
  }
  .second__header.searchBox_ch,
  .second__header.noticeBox_ch {
    width: 74px;
    transition: all ease .5s 0s;
    .menu {
      .__menuItem {
        .__item {
          .__text {
            display: none;
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

// pc2 ->>
@media screen and (max-width: 1700px) {
  .header {
    .second__header {
      width: 245px;
    }
  }
}

// tablet
@media screen and (max-width: 1260px) {
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

// tablet2 -> makebox
@media screen and (max-width: 1020px) {
  .header {
    .makeBox {
      max-width: calc(100% - 250px);
      max-height: calc(100% - 350px);
      width: 100%;
      height: 100%;
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
          .plusMenu {
            display: none;
          }
        }
      }
      // search
      .searchBox.searchBox_ch {
        border-radius: 0;
        padding: 0;
        width: 100%;
        left: 0;
        transition: all ease .5s 0s;
        // transition: .5s;
        .search__titleBox {
          display: block;
          .search__title {
            display: none;
          }
          .search__input {
            display: flex;
            margin: 10px;
            input {
              width: 100%;
              background-size: 5%;
              text-indent: 25px;
              &:focus {
                background-image: none;
                background-position: -10px center;
                text-indent: 0;
              }
            }
            .search__close {
              padding: 10px;
              margin-left: 10px;
              text-align: center;
            }
          }
        }
        .search__list {
          display: block;
        }
      }
      // notice
      .noticeBox.noticeBox_ch {
        border-radius: 0;
        padding: 0;
        width: 100%;
        left: 0;
        transition: all ease .5s 0s;
        // transition: .5s;
        .notice__titleBox {
          display: block;
          .notice__title {
            display: none;
          }
          .notice__input {
            display: flex;
            margin: 10px;
            input {
              width: 100%;
              background-size: 5%;
              text-indent: 25px;
              &:focus {
                background-image: none;
                background-position: -10px center;
                text-indent: 0;
              }
            }
            .notice__close {
              padding: 10px;
              margin-left: 10px;
              text-align: center;
            }
          }
        }
        .notice__list {
          display: block;
        }
      }
    }
    .makeBox {
      max-width: calc(100% - 100px);
      max-height: calc(100% - 500px);
      width: 100%;
      height: 100%;
    }
  }
}
</style>