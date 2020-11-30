# PART 4 활용 Node.js 라이브러리를 활용한 실전 응용

## 121 API 읽는법

fs.access(path[, mode], callback)
= fs.access(path, callback)
= fs.access(path, mode, callback)

## 121 비동기(Async)와 동기(Sync)

비동기: 리턴 값이 없는 실행, 순서 대로 함수를 실행을 하지 않고, 동시에 실행 한다.
동기: 리턴 값을 사용해야 하는 함수, 함수를 하나씩 호출 한다.
함수형 프로그래밍: 비동기 방식의 장점은 살리고, 단점은 줄이면서 프로그램의 구조도 체계적으로 유지 하기 위해 나온 기법

## 123 파일로 출력하기 fs.write()

`fs.writeFile(file, data[, options], callback)`

```javascript
const fs = require("fs");
const contents = "hello\nbye\n안녕";
fs.writeFile("./message.txt", contents, (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});
```

파일 식별자로 파일을 작성하는 경우

`fs.write(fd, string[, position[, encoding]], callback)`

## 124 동기로 파일 열기 fs.readFileSync()

`fs.readFileSync(path[, options])`

encoding 옵션이 주어지면 문자열, 주어지지 않으면 buffer 형태로 리턴한다.

sync: 동기 형식, 호출이 완료 되고 다음 코드로 넘어 가기 때문에, 속도가 느려질 수 있으나, 함수의 호출 순서가 중요한 경우 동기형식으로 호출 해야 한다.

```javascript
const fs = require("fs");
const data = fs.readFileSync("./message.txt");
const text = data.toString();
console.log("sync work01");
console.log(text);

// sync work01
// hello
// bye
// 안녕
```

## 125 비동기로 파일 열기 fs.readFile()

`fs.readFile(path[, options], callback)`

프로그램의 순서가 중요한 경우에는 동기형식을 쓰고, 중요하지 않은 경우에는 비동기로 작성한다.

```javascript
const fs = require("fs");

fs.readFile("./message.txt", (err, data) => {
  if (err) throw err;
  console.log("async work01");
  console.log(data.toString());
});
```

## Buffer (=queue)

컴퓨터사이언스: 데이터를 한 곳에서 다른 곳으로 이동하는 동안 잠시 데이터를 저장 하는 메모리

Node.js: `<Buffer>` 바이너리 데이터를 직접 다루는 클래스, 여러 방법으로 구성될 수 있다.

## 126 파일 내용 수정하기

1. 경로로 파일을 가져 온 뒤, `// fs.readFile(경로, (err, data) => {})`
2. 데이터를 변수에 담고, `// const contents = data.toString()`
3. 해당 변수를 가공 한 후,
4. 해당 경로에 덮어 쓴다. `// fs.writeFile(경로, contents, err => {})`

```javascript
const fs = require("fs");

fs.readFile("./message.txt", (err, data) => {
  if (err) throw err;
  let contents = data.toString();
  contents = "replaced";
  fs.writeFile("./message.txt", contents, (err) => console.log(err));
});
```

## 127 파일에 내용 추가하기 fs.appendFile()

`fs.appendFile(path, data[, options], callback)`

writeFile(): 새로운 내용으로 덮어쓴다.

appendFile(): 해당 경로에 파일이 없으면 새로 만들고, 있으면 기존 파일에 추가 내용을 이어 붙인다. 비동기 형식으로 일어나므로, 순서는 랜덤하게 일어난다.

```js
const fs = require("fs");

const lists = [1, 2, 3, 4, 5];

lists.forEach((list) => {
  // console.log(`Chapter ${list}`)
  fs.appendFile("./chapters.txt", `Chapter ${list}\n`, (err) =>
    console.log(err)
  );
});
```

## 128 디렉토리 만들기 fs.makdirSync()

현재 경로: `__dirname`

해당 경로가 존재 하는지 확인: `fs.existSync(dirName)`

래당 경로 만들기: `fs.mkdirSync(dirName)`

```js
const fs = require("fs");

const dirName = `${__dirname}/img`;

if (!fs.existsSync(dirName)) {
  fs.mkdirSync(dirName);
}
```

## 129 파일 리스트 출력하기

`fs.readdirSync(경로)`: 함수의 인자로 디렉토리를 경로를 받아 경로에 있는 파일 리스트를 배열로 저장하는 함수

```js
const testFolder = "./";
const fs = require("fs");

const files = fs.readdirSync(testFolder);

files.forEach((file) => console.log(file));
```

## 130 list를 json 형식으로 파일에 저장하기, JSON.stringify()

JSON.stringify(): object -> JSON
JSON.parse(): JSON -> object
파일에 문자열 형태로 객체를 저장하기 위한 포맷

```js
const userList = [
  { name: "경록", age: 31 },
  { name: "지현", age: 31 },
];

const fs = require("fs");

fs.writeFileSync("./list.json", JSON.stringify(userList), (err) =>
  console.log(err)
);

const data = fs.readFileSync("./list.json");
console.log(JSON.parse(data));
// [ { name: '경록', age: 31 }, { name: '지현', age: 31 } ]
```

## 131 파일을 json 형식으로 불러오기, JSON.parse()

```js
const fs = require("fs");

fs.readFile("./list.json", (err, data) => {
  const list = data.toString();
  console.log(typeof list); // string

  const json = JSON.parse(list);
  console.log(json); // [ { name: '경록', age: 31 }, { name: '지현', age: 31 } ]
  console.log(typeof json); // object

  json.forEach((people) => console.log(people.name + " " + people.age));
  // 경록 31
  // 지현 31
});
```

비동기: `fs.readFile(path, (err, data) => {...})`
동기: `fs.readFileSync(path)`

비동기 방식은 리턴 결과가 없기 때문에 에러와 출력하는 데이터를 위한 콜백 함수를 넣어줘야 하고, 동기 방식은 리턴 결과가 있기 때문에 함수 호출 결과를 변수에 담아 사용한다.

## 132 파일 이름 바꾸기

`fs.rename(from_path, to_path, err => console.log(err))`

## 133 http 모듈

- 서버 인스턴스: `const server = http.createServer()`
- 실행: `server.listen(port, callback)`
- 종료: `server.close()`

```js
const http = require("http");

const server = http.createServer();

const port = 4000;

server.listen(port, () => {
  console.log(`서버가 동작 중입니다, http://127.0.0.1:${port}`);
});

const closeServer = () => {
  server.close();
  console.log(`서버가 종료되었습니다, http://127.0.0.1:${port}`);
};

setTimeout(closeServer, 5000);
```

## 134 http 모듈 - event

http 인스턴스의 이벤트

- request: 요청 // 사용자가 해당 서버에 접속 요청 할 때 발생
- connection: 접속
- close: 종료
- clientError: 클라이언트에서 오류 발생
- checkContinue: 지속적인 연결 요청

on 메서트를 사용하여, 해당 이벤트에 콜백 함수 연결

`server.on('request', () => {console.log('Request)})`

## 135 http 모듈 - response 모듈

사용자의 요청(request)에 응답(response)을 해 줄 때 사용

- writeHead(): 응답 헤더 작성
- end(): 응답 본문 작성

```js
const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("Hello World");
  })
  .listen(5000, () => {
    console.log("서버가 동작 중입니다, http://127.0.0.1:5000");
  });
```

## 136 http 모듈 - response 객체, fs 모듈 활용 1

- 서버를 생성하고, `// http.createServer()`
- http 객체에 전달하는 함수 안에서 `// (req, res) => {...}`
- fs 모듈을 사용하여 로컬 파일을 가져와서 `// fs.readFileSync(path, (err, data) => { res.end(data) }`
- response 객체에 전달

```js
const fs = require("fs");
const http = require("http");

const port = 5000;

http
  .createServer((req, res) => {
    fs.readFile("./136.example.html", (err, data) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  })
  .listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
  });
```

## 137 http 모듈 - response 객체, fs 모듈 활용 2

Content-Type 속성을 사용해서 여러가지 타입의 데이터를 제공할 수 있다.

MIME 형식
| 타입 | 일반적인 서브타입 예시 |
| ------ | ----------- |
| text | text/plain, text/html, text/css, text/javascript |
| image | image/gif, image/png, image/jpeg, image/bmp, image/webp |
| audio | audio/midi, audio/mpeg, audio/webm, audio/ogg, audio/wev |
| video | video/webm, video/ogg |

서버 안에서 파일을 읽고, 파일 내 데이터를 res.end(data) 형식으로 출력한다. 클라이언트 안에서 요청을 하면 해당 경로의 파일을 읽어와 출력 한다.

```js
const fs = require("fs");
const http = require("http");

http
  .createServer((req, res) => {
    fs.readFile("./newyork.jpg", (error, data) => {
      res.writeHead(200, { "Content-Type": "image/jpg" });
      res.end(data);
    });
  })
  .listen(5001, () => {
    console.log(`서버가 동작 중입니다, http://127.0.0.1:5001`);
  });

http
  .createServer((req, res) => {
    fs.readFile("./cullah.mp3", (error, data) => {
      res.writeHead(200, { "Content-Type": "audio/mp3" });
      res.end(data);
    });
  })
  .listen(5002, () => {
    console.log(`서버가 동작 중입니다, http://127.0.0.1:5002`);
  });
```

## 138 http 모듈 - request 객체, url 속성 활용

request 객체는 사용자가 서버에 보낸 요청에 관한 정보가 들어가 있다.

`Request { url, headers, method, httpVersion }`

url 모듈: 입력 받은 url 를 객체 형태로 파싱해준다.

`Url { protocol, slashes, auth, host, port, hostname, hash, search, query, pathname, path, href }`

```js
const fs = require("fs");
const http = require("http");
const url = require("url");

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    // req.url === url.parse(req.url).pathname
    if (url.parse(req.url).pathname === "/example") {
      fs.readFile("./136.example.html", (err, data) => {
        res.end(data);
      });
    } else {
      fs.readFile("./138.index.html", (err, data) => res.end(data));
    }
  })
  .listen(5000, console.log("Server Running at http://127.0.0.1:5000"));
```

## 139 http 모듈 - request 객체, mothod 속성 GET

GET:

- http://127.0.0.1/5000
- http://127.0.0.1/5000?a=1&b=2
- 그냥 요청 / 네이버에서 검색

POST: 내용을 넣어서 요청 / 회원 가입 할 때 id, 인적사항을 같이 보낼 때

```js
const http = require("http");
const url = require("url");

http
  .createServer((req, res) => {
    const query = url.parse(req.url, true).query;
    console.log(req.method);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`${JSON.stringify(query)}`);
  })
  .listen(5000, () => {
    console.log("Server running at 5000");
  });
```

## [url 모듈](https://nodejs.org/api/url.html)

`url.parse(urlString[, parseQueryString[, slashesDenoteHost]])`

- url 문자열을 가지고 와서 Url 객체를 반환한다
- urlString: url 문자열
- parseQueryString: query 속성의 포맷 결정 (문자열\* or 객체)
  - false(defualt): an unparsed, undecoded string
  - true: querystring module's parse() method / object
- slashesDenoteHost: //와 / 사이 문자열을 호스트 속성을 분리 여부
  - false(defualt): {pathname: '//foo/bar'}
  - true: {host: 'foo', pathname: '/bar'}

## 140 http 모듈 - request 객체, method 속성 POST

GET

- 입력 받은 정보를 url에 담아 보낸다.
- 노출 되도 상관 없거나, 간단한 정보 일 때 유리 하다.

POST

- 입력한 정보를 본문 안에 포함하여 서버에 전달
- 정보가 노출 되면 안되거나 (로그인, 회원가입), 복잡한 데이터를 보낼 때 적합하다.

[Request Body](https://nodejs.org/es/docs/guides/anatomy-of-an-http-transaction/)

- get/post로 전달된 데이터를 가져와 새로운 화면을 보여준다.
- data 이벤트로 입력 받은 데이터를 가져오고
- end 이벤트로 새로운 뷰를 출력 한다.

```js
let body = [];
request
  .on("data", (chunk) => {
    body.push(chunk);
  })
  .on("end", () => {
    body = Buffer.concat(body).toString();
  });
```

```js
const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    const method = req.method;
    if (method === "GET") {
      fs.readFile("./140.example.html", (err, data) => {
        res.writeHead(200, "text/html");
        res.end(data); // 읽은 파일
      });
    }

    if (method === "POST") {
      req.on("data", (data) => {
        console.log(data); // Buffer // 입력된 데이터
        res.writeHead(200, "text/html");
        res.end(data); // 새로운 화면
      });
    }
  })
  .listen(5000, () => {
    console.log("Server running at http://127.0.0.1:5000");
  });
```
