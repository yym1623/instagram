// 깃헙에 올라가지 않기 때문에, 클라우드 서버에서 배포하기 위해선  클라우드로 작성한 .env 파일을 보내거나, 클라우드에서 직접 .env 파일을 만들어서 내용을 넣어주면 된다
// require가 안되서 import로는 된다 -> package.json에서 위쪽 type: module 제거하니 잘된다 -> require로 불러와야 하는것들만 import로 불러올때 에러가 발생되어진다 require로 불러와야 하는건 require로 잘불러와지고 나머지는 import로 잘된단
// npm mysql -> mysql module -> mysql을 연동해준다 (연동이다 이 패키지자체가 mysql이 아니다 연결용 모듈이다 -> 즉 mysql이 없으면 이 모듈만으론 mysql을 만들 순 없다)

// mysql에는 문제가 많아서 mysql2를 이용한다
// + mysql에는 현재 8버전으로 문제되는 부분들이 있어 다운그레이하여 사용해야하는데 권장하지 않는다 -> mysql2를 사용하라
// + ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password ...이렇게 다운그레이 설정 후에 flush privileges 설정을 해야 동작한다(난 안됌)

// mysql
const mysql = require('mysql2');  // mysql 모듈 로드

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
});
connection.connect();

module.exports = connection;