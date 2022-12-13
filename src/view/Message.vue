<script>
import io from 'socket.io-client';
export default {
  data() {
    return {
      nickname: this.$cookies.get('nickname'),
      name: this.$cookies.get('name'),
      user_name: "",
      user_profile: "",
      message_data: "",
      // 주소는 server꺼를 넣는단
      // poling 오류가 걸린다 -> io 두번째 인자인 transports -> websocket으로 설정하니 해결했단
      socket: io('localhost:8000', { transports: ['websocket'] }),
      
      send_ch: false,
      message: false,
      left_hide: false,
      right_hide: false,

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
    }
  },
  methods: {
    sendMessage(name, img) {
      this.left_hide = true;
      this.right_hide = false;
      this.$router.push({
        name: 'Message',
        params: {
          id : name,
          profile : img
        }
      })
      this.message = true;
      this.user_name = name;
      this.user_profile = img
    },
    closeMessage() {
      this.right_hide = true;
      this.left_hide = false;
    },
    // message가 예약어라 안된거 같단 -> 오류메세지 잘읽어라 not a function -> 함수조차 생성이 안된거지 소켓문제가 아니단
    messageBtn() {
      // message -> socket test
      // const socket = io('http://localhost:5173', {
      //   transports: ["websocket"],
      //   // 이걸 설정하지 않으면 오류가 난다고 한다
      //   withCredentials: true
      // })
      // 서버로 데이터 보내기
      this.socket.emit('chat', this.message_data)
      this.message_data = '';
      // 서버에서 보낸 데이터 받기
      this.socket.on('chat', (data) => {
        console.log(data)
      })
      
      
      // socket.emit("login", {
      //   // name: "ungmo2",
      //   msg: this.message_data
      // });


    }
  },
  computed: {
    // computed 만들걸 -> watch에선 선언만 하는거만으로 바뀌는건 computed에서 다 끝내놔서 그걸 선언만하면되는거다 만약 computed로 만든걸 watch로 변경된 데이터를 다시 재할당해야할 경우엔 watch 첫번째인자로 변경된값으로 변경할 순 있단  
    send() {
      if(this.message_data.length > 0) {
        this.send_ch = true;
      } else {
        this.send_ch = false;
      }
    }
  },
  watch: {
    // computed -> watch 연결은 함수명을 같게해주면 된다, 데이터 선언한 이름과 같게해줘도 데이터의 실시간 체크도 할 수 있단, 첫번째 인자로 변경된 데이터가 할당되서 다른값에 재할당 하고싶으면 할 수 있단
    // ex) ajax처럼 새로고침없이 현데이터만 실시간 변경해줄때 재할당 개념으로 watch로 ajax같은 효과를 낼 수 있단? -> watch에서 안되면 computed로 하고 watch에선 선언만한다 -> computed에서 한걸 실시간 변경 및 재할당은 watch에 computed에 생성한 값의 이름을 선언만 해줘도 동작한단
    send(e) {
      
    }
  },
  mounted() {
    if(this.$route.params.id) {
      this.message = true;
      this.user_name = this.$route.params.id
      this.user_profile = this.$route.params.profile
      // 여러개가 안나오는게 아니라 router는 주소에 담긴 동적주소만 새로고침해도 남아있는단 -> 일단 이미지도 주소로 넣고 나중에 수정하자(일단 보여야하닌깐)
    
      // 보통 본인꺼라 그냥 ()로 하는구난 -> 서버꺼 연동하기위해 하는줄 알았단 -> 블로그에선 서버꺼 넣던데?
    }
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
          <div class="__myInfos"  @click="sendMessage(name)">
            <div class="__infoBox">
              <div class="__myImg"></div>
              <div class="__myData">
                <div class="__nickname">{{ name }}</div>
                <div class="__name">message test (date)</div>
              </div>
            </div>
          </div>
          <div class="__myInfos" v-for="user in user_sample" :key="user" @click="sendMessage(user.name, user.profile)">
            <div class="__infoBox">
              <img :src="user.profile" class="__myImg" />
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
        <div class="right__body">
            d
        </div>
        <div class="right__messageInput">
          <div class="__messageInput">
            <div class="__img f__img"><i class="fa-regular fa-face-smile"></i></div>
            <div class="__input">
              <input type="text" placeholder="메시지 입력..." v-model="message_data">
            </div>
            <div class="__imgBox" v-if="!send_ch">
              <div class="__img s__img"><i class="fa-regular fa-image"></i></div>
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
      }
      .right__messageInput {
        margin-top: auto;
        padding: 20px;
        box-sizing: border-box;
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