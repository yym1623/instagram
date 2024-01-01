<img width="888" alt="스크린샷 2024-01-01 오후 11 43 59" src="https://github.com/yym1623/instagram/assets/43946794/a67d948e-21ad-4915-8d02-22c0ed1d9a5e"># SPMV
<!-- 현 npm 버전 16.3.0 -> 버전적는곳이 없다(일단 17.0.0으로 보류 -> 추후에 현 버전으로 바꾼다) -->
[![npm](https://img.shields.io/npm/v/standard.svg)](https://www.npmjs.com/package/npm-auto-version)
![vite](https://img.shields.io/badge/Vite-646CFF)
![vue](https://img.shields.io/badge/Vue3-4FC08D)
![Node.js](https://img.shields.io/badge/Node.js-339933)
<br />
인스타그램 ([DEMO](https://y-instagram.netlify.app))

![image]()

프로젝트 기간 : (2022.12 ~ 2023.02)


## 목차
* <a href="#개발도구">개발도구</a>
* <a href="#프로젝트-소개">프로젝트 소개</a>
  * <a href="#시나리오">시나리오</a>
  * <a href="#프로젝트-목표">프로젝트 목표</a>
  * <a href="#요구사항">요구사항</a>
  * <a href="#기타설정">기타설정</a>
* <a href="#이후의-계획">이후의 계획</a>


## 개발도구
* FrontEnd - Vue3
* server - Node
* bundler - Vite
* build - Aws

## 프로젝트 소개
> #### 시나리오

인스타그램에 대한 디자인 및 기능들을 그대로 재현해본다

> #### 프로젝트 목표

큰 웹에 대한 기능들을 그대로 만들면서 여러 기술들을 습득한다 (socket으로 실시간 채팅기능도 구현하기 위해 실제 웹서버에 배포해본다 - aws)

> #### 요구사항
* 라우터 및 컴포넌트 단위로 페이지를 구성한다
* 반응형으로 (PC, Teblet, Mobile) 구성한다
* axios로 node쪽에서 api와 통신해서 데이터를 가져온다
* aws 및 aws 데이터베이스를 사용해서 데이터도 직접 적재한다
* socket, 데이터베이스, 서버(aws), node(express) 백 구현

> #### 기타설정
* 데이터는 vuex를 이용해서 관리한다 -> 진행중


## 이후의 계획
이번에 만든 프로젝트에는 여러 기술들이 들어간거와 백쪽에서도 cors, session, .env 등등 여러 기술들도 맛 볼수 잇었다
반응형 디자인 및 디자인에 대한 퍼블 기술도 조금이나마 는거 같아서 만족을 했다
이후에도 여러 많이 사용하는 웹들 위주로 만들어보며 다른 사람들이 만든 코드들도 보면서 해봐야 할 거 같다
이번 프로젝트를 통해 블로그보단 공식문서를 참고해야 한다는걸 느꼈다
