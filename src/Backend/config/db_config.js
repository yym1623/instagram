// 깃헙에 올라가지 않기 때문에, 클라우드 서버에서 배포하기 위해선  클라우드로 작성한 .env 파일을 보내거나, 클라우드에서 직접 .env 파일을 만들어서 내용을 넣어주면 된다
// require가 안되서 import로는 된다 -> package.json에서 위쪽 type: module 제거하니 잘된다 -> require로 불러와야 하는것들만 import로 불러올때 에러가 발생되어진다 require로 불러와야 하는건 require로 잘불러와지고 나머지는 import로 잘된단
// npm mysql -> mysql module -> mysql을 연동해준다 (연동이다 이 패키지자체가 mysql이 아니다 연결용 모듈이다 -> 즉 mysql이 없으면 이 모듈만으론 mysql을 만들 순 없다)

// mysql에는 문제가 많아서 mysql2를 이용한다
// + mysql에는 현재 8버전으로 문제되는 부분들이 있어 다운그레이하여 사용해야하는데 권장하지 않는다 -> mysql2를 사용하라
// + ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password ...이렇게 다운그레이 설정 후에 flush privileges 설정을 해야 동작한다(난 안됌)
// mysql
import mysql from 'mysql2';

process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';

import { config as configENV } from 'dotenv';

import { resolve } from 'path';

// env구분(development(개발모드), production(실사용모드))
// + 햇갈리는거 - .env가 우선순위로 개발모드에선 development가 붙은 env파일을 실사용환경에선 production이 붙은 .env를 가져와서 사용해준다? -> 그럼 조건으로 개발모드일때와 실사용환경일때를 왜 조건붙이지? -> 그 조건은 내가 현환경을 ip로 구분해서 하는건간? -> 아니면 서버로 빌드할땐 개발껄 안올리니깐 자연스레 실사용환경꺼가 올라가고 개발모드에선 development가 우선순위가 높으니 그게 적용되서 그런건간?
const root = `${process.cwd()}/`
switch (process.env.NODE_ENV) {
	case 'development':
		configENV({
			path: resolve(root + '.env.development'),
    });
	break;
		
	case 'production':
		configENV({
			path: resolve(root + '.env.production'),
		});
	break;
			
	default:
		throw new Error(`NODE_ENV: ${process.env.NODE_ENV}를 불러올 수 없습니다.`);
}

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
});

export default connection;
