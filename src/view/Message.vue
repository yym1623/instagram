<script>
export default {
  data() {
    return {
      nickname: this.$cookies.get('nickname'),
      name: this.$cookies.get('name'),

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
}
</script>

<template>
  <div class="message">
    <div class="inner">
      <div class="left__info">
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
          <div class="__myInfos">
            <div class="__infoBox">
              <div class="__myImg"></div>
              <div class="__myData">
                <div class="__nickname">{{ name }}</div>
                <div class="__name">message test (date)</div>
              </div>
            </div>
          </div>
          <div class="__myInfos" v-for="user in user_sample" :key="user">
            <div class="__infoBox">
              <img :src="user.profile" class="__myImg" />
              <div class="__myData">
                <div class="__nickname">{{ user.nickname }}</div>
                <div class="__name">message test (date)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right__message">
        <div class="__message">
          <div class="__logo"><i class="fa-regular fa-paper-plane"></i></div>
          <div class="__title">내 메시지</div>
          <div class="__text">친구나 그룹에 비공개 사진과 메시지를 보내보세요.</div>
          <button class="__btn">메세지 보내기</button>
        </div>
        <!-- 실제 socket message 창 연결 -->
        <!-- <div class="__message"></div> -->
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
        padding-top: 8px;
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