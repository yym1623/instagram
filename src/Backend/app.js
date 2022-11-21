process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';

console.log(import.meta.env)

const dotenv = require('dotenv')
// import { config as configENV } from 'dotenv';
const path = require('path');
// import { resolve } from 'path';

// const root = `${process.cwd()}/src/.env/`;
// switch (process.env.NODE_ENV) {
// 	case 'development':
// 		dotenv.config({
// 			path: path.resolve(root + '.env'),
//     });
// 		console.log(process.env.DB_HOST)
// 	break;
		
// 	case 'production':
// 		dotenv.config({
// 			path: path.resolve(root + '.env.production'),
// 		});
// 	break;
			
// 	default:
// 		throw new Error(`NODE_ENV: ${process.env.NODE_ENV}를 불러올 수 없습니다.`);
// }

// import로 불러오는거랑 require로 불러오는걸 각각에 맞게 사용해야한다 ex) node관련은 require() -> require() 오류생기면 package.json에서 type : modles 삭제하라
const express = require('express');

const app = express();

const port = 8000;

// db
// const db = require("./db/db_config.js");

// route
app.get('/', function(req, res){
	res.send('hello NodeJs');
})

// app.get('/users',(req, res) => {
// 	db.query('SELECT * FROM user', (err, results) => {
// 		if(err) throw error;
// 		res.send(results)
// 		console.log('database success');
// 	})
// })




app.listen(port, () => console.log('8000번 포트 대기'));

