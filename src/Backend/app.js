// import로 불러오는거랑 require로 불러오는걸 각각에 맞게 사용해야한다 ex) node관련은 require() -> require() 오류생기면 package.json에서 type : modles 삭제하라
// module
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';
// nodejs에서 img처리 도와주는 라이브러리
import multer from 'multer';
// 파일경로 확인해주는 라이브러리 인거 같단
import fs from 'fs';
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
import { v4 } from 'uuid';
import http from 'http';
import { Server } from "socket.io";

dotenv.config();

// db
import db from './config/db_config.js';

const app = express();

// 서버를 http로 등록한다
const server =  http.createServer(app);

// socket.io
const io = new Server(server, {
  cors: {
		// 서버 본인껄 origin 하지않는다 cors -> 클라쪽껄 해준단
    origin: ['http://localhost:5173']
  }
})

const port = process.env.PORT || 8000;

// 미들웨어
// cors
app.use(cors());
// app.use(
//   cors({
//     origin: "http://127.0.0.1:5500",
//     credentials: true,
//   })
// );

// bodyParser? - POST 방식 전송을 위해서 필요함
app.use(bodyParser.json());

// Parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// express session
import session from 'express-session';
// express session -> save store
import MySQLStore from 'express-mysql-session'
MySQLStore(session)

const options ={                                                 
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PW,
	database: process.env.DB_NAME
};

const sessionStore = new MySQLStore(options);                    

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(session({
	secret: process.env.COOKIE_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: {
    httpOnly: true,
    Secure: true
  },
  name: 'session-cookie',
	store: sessionStore
}));

// socket
// io -> 전체
// io.on -> 전체에 대하여 connection을 걸어선 그 안에서 socket으로 해당 클라이언트끼리만 각각 사용한단
io.on('connection', function(socket) {
	// 받고 보낼때 첫번쨰 인자 클라랑 맞춰주기
	// emit -> 보내기
	// on -> 받기 
	// to - 룸만들기
	// join - 룸에 연결
	// leave - 룸에서 나가기
	// room 조건으로 있는지 확인 등등 manager.rooms로 확인한다 -> to()로 확인하는게 아니라 이렇게 io 메소드가 많다 찾아보기

	// console.log(socket.manager.rooms)
	// console.log("-------------------------");
  // let rooms = io.sockets.manager.rooms;
	// console.log(rooms);
	
	// 조건으로 해당 룸 없으면 만들어서 해당 룸에서 각자 방끼리만 통신하게 하기 -> 하나로하면 여러방 비교도안되고 그렇다고 io로보내면 전체로 보내진단 3개방이면 3개의 똑같이간다
	// console.log(socket.to(data.idx));
	// if(socket.to(data.idx) === undefined) {
	// 	console.log("없음")
	// } else {
	// 	console.log("있음")
	// }
  socket.on('chat', function(data) {
		socket.join(data.idx)
		// io로 묶어야하나보다 -> 그게 맞긴하넨 -> 전체에서 룸을 만들어서 그 안에서 socket으로 하는거다
		io.to(data.idx).emit('test', data)
		
		db.query(`INSERT INTO msg (msg, my_id, list_id) VALUE ('${data.msg}', '${data.my_idx}','${data.idx}')  `, (err, row) => {
			if(err) console.error(err);
			console.log(row);
		})
		console.log(data);
		// 클라이언트에게 메시지 송신
		// io.emit('chat', data);
		

  });



  // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
  // socket.broadcast.emit('chat', msg);

  // 메시지를 전송한 클라이언트에게만 메시지를 전송한다
  // socket.emit('s2c chat', msg);

  // 접속된 모든 클라이언트에게 메시지를 전송한다
  // io.emit('s2c chat', msg);

  // 특정 클라이언트에게만 메시지를 전송한다
  // io.to(id).emit('s2c chat', data);
  
  // socket.on('chat', function() {
  //   console.log('user disconnected: ' + socket.name);
  // });
})



// route
app.get('/', function(req, res){
	res.send('hello NodeJs');
})

// db query

// 기록 - 데이터 보내는건 get으로도 params라는걸 이용해 보낼 수 있지만 어째선지 데이터 보내는건 post -> data로만 보내진다 일단 데이터 전송에 있어선 post로 하잔

// 로그인
app.post('/login', (req, res) => {
	//  	// 세션이 없다면
	//   if(req.body.num === undefined) {
	// 	  // 세션 등록
	// 		req.session.num = 1;
	// 	} else {
	// 		// 세션 추가
	// 		req.session.num += 1;
	// 	}
	const userInfo = {
		'email': req.body.email,
		'pw': req.body.pw
	}
	// 조건으로 하나만 가져올 경우엔 하나니깐 바로 두번째인자인 row로 접근하는게 아닌 row[0] 으로 접근 가능하단
	const sql = `SELECT * FROM user WHERE email = '${userInfo.email}'` 

	// 로그인 검사
	db.query(sql, (err, row) => {
		if(err) {
			console.error(err);
		} else {
			// 값이 잘못들어온다면 쿼리자체를 못해 오류를 뱉고 멈춰버린다 -> 처음부터 부모값이 undefined라면 시작조차 못하게 막는다
			if(row[0] !== undefined) {
				if(row[0].email === userInfo.email && row[0].pw === userInfo.pw) {
					db.query(sql, (err, row) => {
						if(err) {
							console.error(err);
						} else {
							// res 2번 사용하니 오류걸림 send지우고 아래 session을 통한 redirect()를 사용함으로 오류가 사라졌단
							// 세션추가
							req.session.email = row[0].email;
							req.session.name = row[0].name;
							req.session.nickname = row[0].nickname;

							//세션 스토어가 이루어진 후 redirect를 해야함 - 안하면 버그걸림 (서버 데이터 저장후 새로고침해야 적용되는거랑 비슷한 원리같다)
							// 클라로 응답보낼땐 send(), json() 두가지 방법이 있단
							// res 두번요청하면 에러가 걸리므로 일단 세션저장후 리다이렉션은 멈춰보고 문제생길지 변경한단 -> 현재로썬 클라에서하는거라 노드에서 리다이렉션이 필요없게 느껴짐 (노드에서 리다이렉션을 안하여 세션에 문제가 가할경우에 변경하겠다 -> 안해도 디비데이터는 잘날려서 일단 멈춘단)
							req.session.save(err => {
								if (err) console.error(err);
								res.send({ row, session : req.session })
								// 로그인 성공 후 세션저장되면 home으로 이동(메인페이지), 아니면 '/'로 이동해서 app.vue에서 해당 세션값있으면 home으로 가게 설정도 가능
								// 같은 백쪽 경로이동만 되는거같다
								// res.redirect('/');
							});
						}
					})
				} else {
					res.json({
						success: false,
						message: '정보가 일치하지 않습니다'
					})
				}
			} else {
				res.json({
					success: false,
					// 이메일, 비밀번호 각각 알려주는건 사용자 입장에선 좋겠지만 개발자 입장에선 보안요소에 침해된다 -> 둘 중 하나라도 틀리면 하나로 묶어서 틀린걸로 알려주잔
					message: '정보가 일치하지 않습니다'
				})
			}
		}
	})
})

// 로그아웃
app.get('/logout', (req, res) => {
	if (req.session.email) {
		delete req.session.name;
		delete req.session.email;
		delete req.session.nickname;
		// 세션 삭제
		// req.session.destory(function(err){});
		res.json({result: 'SUCCESS'});
	} else {
		res.json({result: 'ERROR', message: 'User is not logged in.'});
	}
});

// 회원가입
app.post('/regster', (req, res) => {
	// userinfo
	const userInfo = {
		'email': req.body.email,
		'pw': req.body.pw,
		'name': req.body.name,
		'nickname': req.body.nickname
	}
	// date
	const today = new Date();

	const year = today.getFullYear();
	const month = ('0' + (today.getMonth() + 1)).slice(-2);
	const day = ('0' + today.getDate()).slice(-2);
	const dateString = year + '-' + month  + '-' + day;

	const sql = `INSERT INTO user (date, email, pw, name, nickname) VALUES ('${dateString}', '${userInfo.email}', '${userInfo.pw}', '${userInfo.name}', '${userInfo.nickname}')` 

	// 유효성 검사 - 중복이메일 검사
	db.query(`SELECT email FROM user WHERE email = '${userInfo.email}'  `, (err, row) => {
		if(row[0] == undefined) {
			db.query(sql, (err, row) => {
				if(err) console.error(err);
				res.send(row)
			})
		} else {
			res.json({
				success: false,
				message: '해당 이메일은 이미 사용중 입니다'
			})
		}
	})
})

// 유저 조횐 -> 조회된 아이디가 최상단으로 해야하니 post로 바꾼다
// 필요한곳에서만 요청하고 재활용하잔
// 모두 app.vue로 전체로 가져와도 되지만 필요한곳에서만 쓰는게 좋단
app.post('/user',(req, res) => {
	// 특정 조건값을 기준으로 정렬하기 -> case
	db.query(`SELECT * FROM user ORDER BY (CASE WHEN email='${req.body.email}' THEN 1 ELSE 0 END) DESC`, (err, row) => {
		if(err) console.error(err);
		// 오브젝트로 보내면 data라는거 안으로 들어간단 -> 오브젝트풀면 바로 들어간다
		res.json(row)
	})
})

// 메세지 유저이름만 다시 요청
app.post('/user_name',(req, res) => {
	console.log(req.body)
	// 특정 조건값을 기준으로 정렬하기 -> case
	db.query(`SELECT * FROM user WHERE email = '${req.body.email}'`, (err, row) => {
		if(err) console.error(err);
		// 오브젝트로 보내면 data라는거 안으로 들어간단 -> 오브젝트풀면 바로 들어간다
		res.json(row[0].name)
	})
})


// 게시물 조회
app.get('/make_select',(req, res) => {
	db.query(`SELECT * FROM make WHERE idx IN (SELECT MAX(idx) FROM make GROUP BY user_id) ORDER BY idx DESC;`, (err, row) => {
		if(err) console.error(err);
		// 오브젝트로 보내면 data라는거 안으로 들어간단 -> 오브젝트풀면 바로 들어간다
		res.json(row)
	})
})

// 메세지 리스트 박스
app.post('/msg_list',(req, res) => {
	console.log(req.body)
	// user -> 본인 idx -> msg_list에 넣어서 매칭한단
	// db 여러개 넣을땐 같은 req이름이면 해당 db들어가기전까진 현재 db값의 req값이단 -> 순서대로 들감
	// db.query(`SELECT * FROM user WHERE email = '${req.body.email}'`, (err, row) => {
		// if(err) console.error(err);

		// 클라에서 전체조회로 클릭한거에 대한 id를 보내면 따로 조회를 할필욘 없어서 코드가 준단
		// 조건마다 다르게 줄거면 달라지니깐 let으로 선언만한다 -> const는 변경이 안되니 선언만하면 오류걸린단
		let idx;
		let sec_idx;
		if(req.body.my_idx === req.body.idx) {
			idx = req.body.my_idx;
		} else {
			idx = req.body.my_idx + ',' + req.body.idx;
		}
		// 숫자열은 안잡히고 문자열만 length로 잡히닌 length가 있는건 두명의 유저가 있다는 뜻 length로 조건을 건단
		if(idx.length === undefined) {
			// return
		} else {
			// 두명의 유저가 있는 문자열만 숫자만 뒤바꿔서 새로운 변수에 넣어서 총 3개의 변수를 비교한다
			// sec_idx = idx.split().reverse().join();
			sec_idx = idx.split(',').reverse().join();
			console.log(sec_idx);

		}
		console.log('idx')
		console.log(idx)
		// 여기선 클라에서 받은 idx값으로 값이 있으면 냅두고 없으면 만든다
		db.query(`SELECT * FROM msg_list WHERE msg_list = '${idx}' OR msg_list = '${sec_idx}'`, (err, row) => {
			if(err) console.error(err);
			// 보통 없으면 위에서 리턴으로 끝내고 있으면 내려가니 이렇게 순서를 맞춘단
			console.log(row.length);
			if(row.length !== 0) {
				// 맞다면 여기서 무슨값을 보내서 한단?
				res.json(row[0].msg_list)
				return;
			} else {
				db.query(`INSERT INTO msg_list (msg_list) VALUE ('${idx}')`, (err, row) => {
					if(err) console.error(err);
				})
			}

		})
		db.query(`SELECT * FROM msg WHERE list_id = '${req.body.idx}'`, (err, row) => {
			if(err) console.error(err);
			if(row.length !== 0) {
				// 메세지 출력
				// res.json(row.msg);
			}
		})
})

// 메세지 작성하긴
// app.post('/send_msg',(req, res) => {
// 	db.query(`INSERT INTO msg (msg, list_id) VALUE ('${req.body.msg}', '${req.body.idx}')  `, (err, row) => {
// 		if(err) console.error(err);
// 		console.log(row);
// 	})
// });

// 아이디에 맞는 글 조회하기
app.post('/select_msg',(req, res) => {
	// 비교해줘야 한단 -> 위치 바꿔서 있으면 연동해준단
	let idx = req.body.idx;
	console.log('=----')
	console.log(req.body)
	// let sec_idx;
	// console.log('----------여기임')
	// console.log(typeof idx)
	// console.log(.length)
	// if(idx.length === undefined) {
	// 	// return
	// } else {
	// 	// 두명의 유저가 있는 문자열만 숫자만 뒤바꿔서 새로운 변수에 넣어서 총 3개의 변수를 비교한다
	// 	// sec_idx = idx.split().reverse().join();
	// 	sec_idx = idx.split(',').reverse().join();
	// }

	// console.log('----------여기임')
	// console.log(idx)
	// console.log(sec_idx)
	
	db.query(`SELECT * FROM msg WHERE list_id = '${idx}'`, (err, row) => {
		if(err) console.error(err);
		// console.log(row);
		res.json(row)
	})
});


// 본인글 조회
app.post('/user_make_select',(req, res) => {
	// 하나일땐 따로 변수만들어서 할 필요 없이 바로 넣잔
	// console.log(req.body.email)
	db.query(`SELECT * FROM make WHERE email = '${req.body.email}'`, (err, row) => {
		if(err) console.error(err);
		// 오브젝트로 보내면 data라는거 안으로 들어간단 -> 오브젝트풀면 바로 들어간다
		res.json(row)
	})
})

// 글쓰긴
// multer
// 이미지 하나만 - single(), 여러개는 array()
// multer을 이용해 파일 업로드 기능 구현
// single()안에 이름을 formData로 넘어온 파일이름하고 맞아야 하는거 같단
// const upload = multer({ dest: './uploads/' })
// 파일명만 저장되니 img주소쪽에선 끝에 + png 붙여준단 -> 프론트쪽엔선 서버 보내기전에 따로 src로 데이터만들어서 보여주니 상관없단
// 일단 싱글 후 성공하면 여러개로 한단
// 전분 데이터로 할 필요없고 고정값들은 직접 문자열로 데이터랑 +로 매칭시키면 된단 -< 일단되게하고 나중에 효율적인게있으면 바꾼단
// const upload = multer({ dest: 'public/uploads/' })
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, v4() + "_" + file.filename + '.png')
  }
})

const upload = multer({ storage: storage })
app.post('/make', upload.single('myfile'), function (req, res, next) {
	// console.log(req.file)
	// console.log(req.body)

	// path가 /가 끊겨나오는 이유로 합쳐준단
	// 매칭시키잔 디비 + 저장이미지 -> 파일명이 변해도 이미지 데이터 자체가 저장되는거라 매칭만해주면 불러와진단
	// 이미지데이터 자체를 저장 -> url주소가 아니라 내 pc에 저장되면서 불러오는거단, url주소로저장 등등 ㄴㄴ
	const img =	"/public/uploads/" + req.file.filename;

	const userInfo = {
		'email': req.body.email,
		'name': req.body.name,
		'nickname': req.body.nickname,
		'write': req.body.write
	}
	// date
	const today = new Date();

	// 년 + 월 + 일
	const year = today.getFullYear();
	const month = ('0' + (today.getMonth() + 1)).slice(-2);
	const day = ('0' + today.getDate()).slice(-2);
	
	// 시 + 분 + 초
	const hours = today.getHours();
	const minutes  = ('0' + (today.getMinutes() + 1)).slice(-2);
	const seconds  = ('0' + today.getSeconds()).slice(-2);

	const dateString = year + '-' + month  + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

	// 유효성 검사 - 중복이메일 검사
	db.query(`SELECT * FROM user WHERE email = '${userInfo.email}'  `, (err, row) => {
		// write같은 예약어는 사용하면 오류 걸리는거 같다 ``를 붙이지 않는이상 다른걸 쓰잔
		const sql = `INSERT INTO make (date, email, name, nickname, img, make_write, user_id) VALUES ('${dateString}', '${userInfo.email}', '${userInfo.name}', '${userInfo.nickname}', '${img}', '${userInfo.write}', '${row[0].idx}')`; 
		db.query(sql, (err, row) => {
			if(err) console.error(err);
			// res.send(row)
			res.json({
				success: true,
				message: '업로드완료',
			})
		})
	})
})

// socekt 때매 변경해서 사용해보긴 -> http server 설정한걸로 사용해야한다 -> 웹 소켓 프로토콜로 변경한단
server.listen(port, () => console.log('localhost:8000'));
// app.listen(port, () => console.log('localhost:8000'));