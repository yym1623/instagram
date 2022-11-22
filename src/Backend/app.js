// import로 불러오는거랑 require로 불러오는걸 각각에 맞게 사용해야한다 ex) node관련은 require() -> require() 오류생기면 package.json에서 type : modles 삭제하라
// module
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// db
import db from './config/db_config.js';

const app = express();

const port = process.env.PORT || 8000;

// cors
app.use(cors());

app.use(bodyParser.json());

// Parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// express session
import session from 'express-session';                      
import MySQLStore from 'express-mysql-session';
MySQLStore(session);

const options ={                                                 
	host: process.env.DB_TARGET,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PW,
	database: process.env.DB_NAME
};
const sessionStore = new MySQLStore(options);                    

app.use(session({
  secret:"asdfasffdas",
  resave:false,
  saveUninitialized:true,
  store: sessionStore
}))





// route
app.get('/', function(req, res){
	res.send('hello NodeJs');
})

// db query
db.connect();
// select
app.get('/users',(req, res) => {
	console.log(req.body)
	db.query('SELECT * FROM user', (err, results) => {
		if(err) throw err;
		res.send(results)
		console.log('select success');
	})
})

// 기록 - 데이터 보내는건 get으로도 params라는걸 이용해 보낼 수 있지만 어째선지 데이터 보내는건 post -> data로만 보내진다 일단 데이터 전송에 있어선 post로 하잔

// 로그인
app.post('/login', (req, res) => {
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
							res.send(row)
							// session에 저장
							console.log(req.session)
							req.session.email = row[0].email;
							req.session.name = row[0].name;
							req.session.nickname = row[0].nickname;
							req.session.isLogined = true;

							//세션 스토어가 이루어진 후 redirect를 해야함 - 안하면 버그걸림
							// req.session.save(function() {
							// 	req.redirect('/');
							// });
							// 세션삭제
							// req.session.destory(function(err){});
						}
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