// import로 불러오는거랑 require로 불러오는걸 각각에 맞게 사용해야한다 ex) node관련은 require() -> require() 오류생기면 package.json에서 type : modles 삭제하라
// module
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
dotenv.config();

// db
import db from './config/db_config.js';

const app = express();

const port = process.env.PORT || 8000;

// 미들웨어
// cors
app.use(cors());

// bodyParser? - POST 방식 전송을 위해서 필요함
app.use(bodyParser.json());

// Parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// express session
import session from 'express-session';
// express session -> save store
import MySQLStore from 'express-mysql-session' 
import { compileScript } from 'vue/compiler-sfc';
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




// route
app.get('/', function(req, res){
	res.send('hello NodeJs');
})

// db query
// db.connect();

// 조회
app.get('/users',(req, res) => {
	db.query('SELECT * FROM user', (err, results) => {
		if(err) throw err;
		res.send(results)
		console.log('select success');
	})
})

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


app.listen(port, () => console.log('localhost:8000'));