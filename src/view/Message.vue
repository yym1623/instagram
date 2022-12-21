<script>
import axios from 'axios';
import io from 'socket.io-client';

export default {
  // 대충 암묵적인 순서가 있단 - setup -> components, data 등등 -> 또한 어떤건 data() { return {} }, compunted: { data() }, mounted() 등등 선언이 다르다 내 예상 data랑 라이프사이클은 ()생성하고 data는 그 안의 리턴 또 생성한단 리턴밖에단 변수생성 등등 이 두가지말곤 다 : {} 안에다 함수생성 식으론 똑같단ㄴㄴ
  data() {
    return {
      nickname: this.$cookies.get('nickname'),
      name: this.$cookies.get('name'),
      email: this.$cookies.get('email'),
      user_name: "",
      user_profile: "",
      message_data: "",
      user_list: [],
      msg_list: [],
      fileList: [],
      idx: 0,
      my_idx: 0,
      msg_ch: "",
      socket_msg: "",
      // 주소는 server꺼를 넣는단
      // poling 오류가 걸린다 -> io 두번째 인자인 transports -> websocket으로 설정하니 해결했단
      socket: io('localhost:8000', { transports: ['websocket'] }),
      
      // 객체로 넘어오지만 문자열로해도 잘 들어간다, 그래도 맞게 사용하잔 -> 나중에 햇갈릴수 있으니
      socket_file_img: {},
      send_ch: false,
      message: false,
      left_hide: false,
      right_hide: false,
      socket_img_ch: false,
    }
  },
  methods: {
    // click event -> methods로 (computed -> x)
    async sendMessage(name, email, idx) {
      this.message_data = "";
      this.socket_file_img = "";
      this.socket_img_ch = false;

      this.idx = idx;
      this.left_hide = true;
      this.right_hide = false;
      this.message = true;

      // 같은함수든 뭐든 같은곳에 2개의 같은 변수이름만 없으면된다 다른곳에선 다 써도 중복안된단 -> 지역변수라
      const user_name = await axios.post('http://localhost:8000/user_name', { email : email });
      // this붙인건 vue에서 선언한 데이터, 안붙인건 변수같은거단 = 같아도 this만 잘 구분하면 상관없단
      this.user_name = user_name.data;
      console.log(user_name)

      const msg_ch = await axios.post('http://localhost:8000/msg_list', { my_idx : this.my_idx, idx : this.idx });
      console.log(msg_ch)
      this.msg_ch = msg_ch.data;
      console.log('test')
      console.log(this.msg_ch)

      // 처음부터 보여주는게 아닌 유저를 클릭한순간부터 보는거라 여기서부터 요청하면 된단
      const msg_list = await axios.post('http://localhost:8000/select_msg', { idx : this.msg_ch })
      console.log(msg_list);
      console.log('asd')
      this.msg_list = msg_list.data;
    },
    closeMessage() {
      this.right_hide = true;
      this.left_hide = false;
    },
    // message가 예약어라 안된거 같단 -> 오류메세지 잘읽어라 not a function -> 함수조차 생성이 안된거지 소켓문제가 아니단
    async messageBtn() {
      // socket
      // 서버로 데이터 보내기 -> 메세지는 소켓으로 넘어간 백쪽에서 디비에 넣어준단 -> 여기서 db로 요청하는게 아니라
      this.socket.emit('chat', {
        msg: this.message_data,
        idx: this.msg_ch,
        my_idx: this.my_idx,
        img: this.socket_file_img
      })
      this.message_data = '';
      
      // 서버에서 보낸 데이터 받기
      await this.socket.on('test', async (data) => {
        console.log(data)
        console.log('`````````')
        // console.log('메세지받긴')
        // this.socket_msg = data.msg;
        // this에 담긴 text를 그대로 디비에 넣어서 보여질수도있진만 -> 소켓을 이용해 검색된 내용을 받을때마다 api요청하여 디비에 넣고 보여준다 -> (소켓사용 이유가 아직 명확하진 않지만 일단 처음이지 해보잔)
        // + 수정 -> 소켓에서 보낸 데이터를 서버쪽에서 디비에 저장시키고 돌아올때 저장된걸 보여준단, 순간 보낸걸 받아서 다시 보내고 저장해서 이상했단
        const send_msg = await axios.post('http://localhost:8000/select_msg', { idx: this.msg_ch });
        this.msg_list = send_msg.data;
        this.socket_img_ch = false;
        console.log(this.msg_list)
        // this.msg_list = this.msg_list.concat(data.msg)
      })
    },
    upload(e) {
      console.log(e);
      this.socket_file_img = e[0];
      console.log(this.socket_file_img)
      console.log(e)
      this.addFiles(e)
      this.socket_img_ch = true;
    },
    async addFiles (files) {
      // 반복문으로 여러개 가능하게 했지만 소켓에선 하나만 쓰잔 -> 굳이 하나로 바꿀필욘없다 나중을 위해선
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
    async readFiles (files) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = async (e) => {
          resolve(e.target.result) 
        }
        reader.readAsDataURL(files)
      })
    },
  },
  computed: {
    // computed 만들걸 -> watch에선 선언만 하는거만으로 바뀌는건 computed에서 다 끝내놔서 그걸 선언만하면되는거다 만약 computed로 만든걸 watch로 변경된 데이터를 다시 재할당해야할 경우엔 watch 첫번째인자로 변경된값으로 변경할 순 있단  
    send() {
      if(this.message_data.length > 0 || this.socket_img_ch) {
        this.send_ch = true;
      } else {
        this.send_ch = false;
      }
    },
  },
  watch: {
    // computed -> watch 연결은 함수명을 같게해주면 된다, 데이터 선언한 이름과 같게해줘도 데이터의 실시간 체크도 할 수 있단, 첫번째 인자로 변경된 데이터가 할당되서 다른값에 재할당 하고싶으면 할 수 있단
    // ex) ajax처럼 새로고침없이 현데이터만 실시간 변경해줄때 재할당 개념으로 watch로 ajax같은 효과를 낼 수 있단? -> watch에서 안되면 computed로 하고 watch에선 선언만한다 -> computed에서 한걸 실시간 변경 및 재할당은 watch에 computed에 생성한 값의 이름을 선언만 해줘도 동작한단
    send(e) {
      
    },
    msg_list(e) {
      this.$nextTick(() => {
        let messages = this.$refs.msg_list;

        messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
      });
    }
  },
  async mounted() {
    if(this.$route.params.id) {
      this.message = true;
      this.user_name = this.$route.params.id
    }
    const res = await axios.post('http://localhost:8000/user', { email : this.email } );
    console.log(res);
    this.my_idx = res.data[0].idx;
    this.user_list = res.data;
  }
}
</script>

<template>
  <div class="message">
    <div class="inner">
      <div class="left__info" :class="{ left_hide }">
        <div class="__myInfo">
          <div class="__nicknameBox">
            <div class="__nickname">{{ nickname }}</div>
            <div class="__icon">
              <span class="material-symbols-outlined">expand_more</span>
            </div>
          </div>
          <div class="__newMes">
            <i class="fa-regular fa-pen-to-square"></i>
          </div>
        </div>
        <div class="__myMenu">
          <!-- my -->
          <!-- 반복되는 유저마다 클릭시 메세지창으로 가야하니 v-for부분에 click이 맞단 -->
          <!-- <MsgUser></MsgUser> -->
          <div class="__myInfos"  @click="sendMessage(user.name, user.email, user.idx)" v-for="user in user_list" :key="user">
            <div class="__infoBox">
              <div class="__myImg"></div>
              <div class="__myData">
                <div class="__nickname">{{ user.name }}</div>
                <div class="__name">message test (date)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right__message" v-if="!message">
        <div class="__message">
          <div class="__logo"><i class="fa-regular fa-paper-plane"></i></div>
          <div class="__title">내 메시지</div>
          <div class="__text">친구나 그룹에 비공개 사진과 메시지를 보내보세요.</div>
          <button class="__btn">메세지 보내기</button>
        </div>
        <!-- 실제 socket message 창 연결 -->
        <!-- <div class="__message"></div> -->
      </div>
      <!-- 컴포넌트할껏은 그부분만 복사해서 붙여넣어서 props로 넘겨서 해당 부모요소에만 조건이든 뭐든 걸거만 걸면 된단 -> 넘겨온 해당 데이터는 해당페이지에서 렌더링한다 -->
      <div class="right__messageBox" v-else :class="{ right_hide }">
        <div class="right__header">
          <div class="__userInfo">
            <div class="close__message" @click="closeMessage()"><span class="material-symbols-outlined">chevron_left</span></div>
            <div class="__name">{{ user_name }}</div>
          </div>
          <div class="__itemBox">
            <!-- instagram의 icon은 전부 하얀색 바탕이지만 -> 검은색 밖에 없기 떄문에 일단 검은색으로 한단 -->
            <div class="__item"><i class="fa-solid fa-phone"></i></div>
            <div class="__item"><i class="fa-solid fa-video"></i></div>
            <div class="__item"><i class="fa-solid fa-circle-info"></i></div>
          </div>
        </div>
        <div ref="msg_list" class="right__body">
          <div class="msg_box" :class="msg.my_id === my_idx ? 'right_msg' : 'left_msg'" v-for="msg in msg_list" :key="msg">
            <!-- <div class="img_textBox"> -->
              <img v-if="msg.img !== ''" :src="msg.img" alt="">
              <span v-if="msg.msg !== ''">{{ msg.msg }}</span>
            <!-- </div> -->
          </div>
        </div>
        <div class="right__messageInput">
          <div class="socket__img" :class="{ socket_img_ch }">
            <img :src="fileList.length > 0 ? fileList[0].src : ''" />
          </div>
          <div class="__messageInput">
            <div class="__img f__img"><i class="fa-regular fa-face-smile"></i></div>
            <div class="__input">
              <input type="text" placeholder="메시지 입력..." v-model="message_data" @keydown.enter="messageBtn()">
            </div>
            <div class="__imgBox" v-if="!send_ch">
              <!-- <div class="__img s__img"><i @click="socket_img()" class="fa-regular fa-image"></i></div> -->
              <div class="__img s__img">
                <input type="file" @change="upload($event.target.files)" ref="file" style="display: none" />
                <i @click="$refs.file.click()" class="fa-regular fa-image"></i>
              </div>
              <div class="__img t__img"><i class="fa-regular fa-heart"></i></div>
            </div>
            <div class=" __sendBox" v-else>
              <button class="sendBtn" @click="messageBtn()">보내기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.message {
  position: static;
  width: calc(100% - 335px);
  min-height: 100vh;
  margin-left: auto;
  background: rgb(250, 250, 250);
  padding: 20px;
  box-sizing: border-box;
  .inner {
    max-width: 932px;
    width: 100%;
    height: 895px;
    margin: auto;
    display: flex;
    border: 1px solid rgb(219, 219, 219);
    border-radius: 5px;
    box-sizing: border-box;
    .left__info {
      overflow: hidden;
      min-width: 350px;
      // width: 100%;
      height: 100%;
      border-right: 1px solid rgb(219, 219, 219);
      box-sizing: border-box;
      .__myInfo {
        display: flex;
        height: 60px;
        // justify-content: center;
        align-items: center;
        padding: 0 20px;
        border-bottom: 1px solid rgb(219, 219, 219);
        box-sizing: border-box;
        .__nicknameBox {
          display: flex;
          // flex가 걸린 자식요소에 felx로 각각 맞춰줄 수 있단
          flex: 1;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          .__icon {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 3px;
            span {
              font-size: 30px;
            }
          }
          &:active {
            opacity: .8;
          }
        }
        .__newMes {
          display: flex;
          align-items: center;
          font-size: 24px;
          cursor: pointer;
        }
      }
      .__myMenu {
        height: 100%;
        overflow: hidden auto;
        .__myInfos {
          padding: 8px 20px;
          display: flex;
          align-items: center;
          cursor: pointer;
          .__infoBox {
            display: flex;
            align-items: center;
            .__myImg {
              background: #eee;
              width: 56px;
              height: 56px;
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
          }
          &:hover {
            background: rgb(245, 245, 245);
          }
        }
      }
    }
    .right__message {
      max-width: 582px;
      width: 100%;
      height: 100%;
      padding: 24px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      .__message {
        text-align: center;
        .__logo {
          font-size: 58px;
          i {
            border: 1px solid #333;
            border-radius: 50%;
            padding: 18px;
          }
        }
        .__title {
          margin-top: 20px;
          font-size: 22px;
          color: #262626;
        }
        .__text {
          margin-top: 10px;
          font-size: 14px;
          color: #828282
        }
        .__btn {
          margin-top: 20px;
          width: 110px;
          height: 30px;
          font-size: 14px;
          font-weight: bold;
          color: #fff;
          cursor: pointer;
          border-radius: 5px;
          padding: 5px 10px;
          border: 1px solid transparent;
          background: rgb(0, 149, 246);
          &:active {
            opacity: .8;
          }
        }
      }
    }
    .right__messageBox {
      max-width: 582px;
      width: 100%;
      height: 100%;
      .right__header {
        padding: 0 20px;
        height: 60px;
        border-bottom: 1px solid rgb(219, 219, 219);
        display: flex;
        justify-content: space-between;
        align-items: center;
        .__userInfo {
          display: flex;
          align-items: center;
          .close__message {
            display: none;
            span {
              font-size: 27px;
              cursor: pointer;
            }
          }
          .__name {
            // margin-left: 12px;
            color: #262626;
            font-weight: bold;
          }
        }
        .__itemBox {
          display: flex;
          .__item {
            font-size: 22px;
            padding: 8px;
          }
        }
      }
      .right__body {
        width: 100%;
        max-height: 748px;
        height: 100%;
        overflow: hidden auto;
        padding: 20px;
        box-sizing: border-box;
        // position은 역시 딱딱한 맛이있단, flex나 margin을 쓰잔 -> 줄어들면서 자연스럽게 줄어드는 느낌이단 -> 포지션은 강제느낌
        .msg_box.left_msg {
          // 겹쳐진 아이템들이 display - flex로 바꾸니깐 잘나온단
          display: flex;
          padding: 10px 0;
          box-sizing: border-box;
          span {
            border-radius: 30px;
            padding: 15px;
            background: transparent;
            border: 1px solid #eee;
            text-align: center;
            box-sizing: border-box;
          }
        }
        .msg_box.right_msg {
          display: flex;
          justify-content: flex-end;
          padding: 10px 0;
          box-sizing: border-box;
          span {
            // width가 해당 값만큼 안늘어나서 불편할땐 padding을 전체적으로주면 그만큼 가운데로 가게되니 편하단
            border-radius: 30px;
            padding: 15px;
            background: #eee;
            text-align: center;
            box-sizing: border-box;
          }
        }
      }
      .right__messageInput {
        position: relative;
        margin-top: auto;
        // padding: 20px;
        margin: 20px;
        box-sizing: border-box;
        .socket__img {
          // 이미지가 개수나 위치가 고정값이라면 이렇게줘도 상관없단
          display: none;
          position: absolute;
          width: 100%;
          top: -120px;
          padding-left: 5px;
          height: 100%;
          border-bottom: none;
          img {
            width: 150px;
            height: 100px;
            // border-radius은 뭔가 10이 깔끔하단 20은 너무큼
            border-radius: 10px;
          }
        }
        .socket__img.socket_img_ch {
          display: block;
        }
        .__messageInput {
          display: flex;
          align-items: center;
          border: 1px solid rgb(219, 219, 219);
          border-radius: 22px;
          padding: 0 10px;
          height: 44px;
          box-sizing: border-box;

          .__img {
            font-size: 24px;
            padding: 8px;
            i {
              cursor: pointer;
            }
          }
          .__input {
            flex: 1 1 auto;
            max-width: 100%;
            input {
              width: 100%;
              box-sizing: border-box;
              height: 30px;
              background: transparent;
              outline: none;
              border: none;
            }
          }
          .__imgBox {
            display: flex;
          }
          .__sendBox {
            display: flex;
            padding: 8px;
            .sendBtn {
              border: none;
              background: transparent;
              color: #0095F6;
              font-size: 14px;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}

// pc 2 ->>
@media screen and (max-width: 1700px) {
  .message {
    position: static;
    width: calc(100% - 245px);
  }
}

  // tablet - 1024, mobile - 760이 평균인데 instagram에 맞춰서 tablet - 1250, mobile - 760으로 해본다 (페이지마다 조금씩 차이가 있단)
  // tablet
@media screen and (max-width: 1200px) {
  .message {
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
      .left__info {
        min-width: 300px;
      }
      .right__messageBox {
        max-width: 100%;
        .right__body {
          width: 100%;
          max-height: 790px;
          height: 100%;
          padding: 20px;
          box-sizing: border-box;
        }
      }
    }
  }
}

// mobile
@media screen and (max-width: 760px) {
  .message {
    position: fixed;
    top: 0;
    width: 100%;
    margin: auto;
    padding: 0;
    .inner {
      height: 100vh;
      .left__info {
        width: 100%;
      }
      .left__info.left_hide {
        display: none;
      }
      .right__message {
        display: none;
      }
      .right__messageBox {
        max-width: 100%;
        .right__body {
          width: 100%;
          max-height: 743px;
          height: 100%;
          padding: 20px;
          box-sizing: border-box;
        }
        // 기본값으로 적어준 경로랑 같게해야 미디어쿼리가 동작한다 -> 바로 접근해도 처음 설정한 경로랑 다르면 설정이 안먹는단
        .right__header {
          .__userInfo {
            .close__message {
              display: block;
            }
          }
        }
      }
      .right__messageBox.right_hide {
        display: none;
      }
    }
  }
}

// mobile2 ->>
@media screen and (max-width: 660px) {
  .message {
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