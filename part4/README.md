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

## 141 쿠기(Cookie) 생성

```js
const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html",
      "Set-Cookie": ["soju = pork", "beer = chicken"],
    });
    res.end(`<h1>${req.headers.cookie}</h1>`);
  })
  .listen(5000, () => {
    console.log("Server running at http://127.0.0.1:5000");
  });
```

처음에는 아무것도 표시하지 않지만, 다시 접속하면 기존에 저장된 쿠키를 출력한다.

쿠키

- 사용자가 웹사이트를 접속 할 경우 '일정 기간'동안 '서버 혹은 클라이언트'에 저장되는 기록 정보
- 사용자가 접속 할 때 마다 새로 쓰일 수 있다.
- 헤더의 'Set-Cookie' 속성에 배열 형태로 작성 한다.
  - `res.wirteHeader( 200, { "Set-Cookie": ["a=one", "b=two"] } )`

## 쿠키 (Cookie) 추출

쿠키는 JSON 형태로 저장된다

-> 문자열로 바꾸기: JSON.stringify

-> 키와 값으로 분리

- 쿠키 ; 키 = 값
- split(';')
- split(':'
  )

```js
const http = require("http");

http
  .createServer((req, res) => {
    if (req.headers.cookie) {
      const cookie = req.headers.cookie.split(";").map((element) => {
        element = element.split("=");
        return {
          name: element[0],
          value: element[1],
        };
      });
      res.end(`<h1>${JSON.stringify(cookie)}</h1>`);
      // [{"name":"soju","value":"pork"},{"name":" beer","value":"chicken"}]
    }

    if (!req.headers.cookie) {
      res.writeHead(200, {
        "Content-Type": "text/html",
        "Set-Cookie": ["soju=pork", "beer=chicken"],
      });
      res.end(`<h1>Created Cookie</h1>`);
    }
  })
  .listen(5000, () => {
    console.log("Server running at http://127.0.0.1:5000");
  });
```

## 143 Node.js 프로젝트 만들기 (build 하기)

Node.js 에서의 프로젝트는 하나의 폴더나 디렉토리를 말한다. 원하는 위치에 폴더를 만들고, 안에서 `npm init` 명령어를 사용해서 `package.json` 파일을 생성한다.

## 144 프로젝트 초기화 하기 - npm init

`npm init`: 프로젝트 정보가 들어가 있는 `package.json` 파일 생성

`package.json`: name, version, description, entry point, git respository, keywords, author, license

npm: node package manager, node.js 라이브러리 관리 프로그램

## 145 패키지 설치 - npm install

프레임워크: 자주 사용하는 코드를 모아 놓은 것

npm: 라이브러리, 패키지 등을 직접 구현해 놓은 형태

`npm install <패키지이름> --save`: 새로운 프레임워크를 설치하고 package.json에 기록

## 145 패키지 지우기 - npm uninstall

`npm install <패키지이름>`

`--save`: package.json - dependency

`--save-dev`: package.json - devDependency (개발시에만 필요한 패키지를 명시하는 경우)

## 147 필요한 module 설치하기

예제에서 사용할 모듈

- request: 서버 요청 보내기
- cheerio: 웹페이지 크롤링
- iconv-lite: 컴파일 과정이 필요없이 인코딩을 제공

## 148 [request](https://www.npmjs.com/package/request#request---simplified-http-client)로 구글 크롤링하기

크롤링: 프로그램이 웹사이트를 돌면서 정기적으로 정보를 추출하는 기술

`request(옵션, 호출 후 실행할 함수)`

```js
const request = require("request");

request(
  {
    url: "https://www.google.com/",
    method: "GET",
  },
  (error, response, body) => console.log(body)
);
```

## 149 request로 파라미터 추가해 호출하기

해당 경로 (url?q='신사역맛집')을 크롤링해서 로컬 화면에 띄우기
`https://www.google.com/search?q=신사역맛집`

```js
http
  .createServer((req, res) => {
    request(
      {
        url: "https://www.google.com/search",
        method: "GET",
        qs: { q: "신사역 맛집" },
      },
      (error, response, body) => {
        res.writeHead(200, { "Content-Typ": "text/html" });
        res.end(body);
      }
    );
  })
  .listen(5000, () => {
    console.log("Server running at http://127.0.0.1:5000");
  });
```

## 150 한글 깨지는 문제 해결하기

[iconv-lite](https://www.npmjs.com/package/iconv-lite)

- 문서의 인코딩을 번경 해주는 라이브러리
- `incov.decode(body, 'euc-kr')`
- http 요청을 보낼 떄 인코딩을 설정해줘야 한다. (encoding: null)

euc-kr(Extended Unix Code)

- EUC-KR: 한글, 한자, 영문을 표기 (한글: 2 Byte)
- UTF-8: 범용 유니코드 (한글: 3 Byte, 공백: 1 Byte)

```js
request(
  {
    url: "https://www.google.com/search",
    method: "GET",
    qs: { q: "신사역 맛집" },
    encoding: null,
  },
  (error, response, body) => {
    res.writeHead(200, { "Content-Typ": "text/html" });
    const decodedResult = iconv.decode(body, "euc-kr");
    res.end(decodedResult);
  }
);
```

## 151 [cheerio](https://www.npmjs.com/package/cheerio)란?

스크래핑: 웹 사이트에 있는 특정 정보를 추출하는 기술
cheerio는 html 형식으로 되어 있는 문자열에서 태그나 다른 부분을 제외한 값들만 뽑아낼 때 유용하다

```js
const cheerio = require("cheerio");

const $ = cheerio.load('<html><h2 class="title">hello</h2></html>');
const titleText = $(`h2.title`).text();

console.log("title", titleText);
```

## 152 cheerio 이용해서 필요한 부분 추출하기

[charset](https://www.npmjs.com/package/charset)

- Get the content charset from header and html content-type.
- ```js
  res.on("data", function (chunk) {
    console.log(charset(res.headers, chunk));
    // or `console.log(charset(res, chunk));`
    res.destroy();
  });
  ```

```js
const crawl = (callback) => (queryString) =>
  request(
    {
      url: "https://www.google.com/search",
      encoding: null,
      method: "GET",
      qs: queryString,
      timeout: 1000,
      followRedirect: true,
      maxRedirects: 10,
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const enc = charset(response.headers, body); // enc-kr
        const decodedResult = iconv.decode(body, enc);
        callback(decodedResult);
      } else {
        console.log(`error ${response.statusCode}`);
      }
    }
  );
```

```js
const parse = (decodedResult) => {
  const $ = cheerio.load(decodedResult);
  const titles = $("h3.r").find("a");
  for (let i = 0; i < titles.length; i += 1) {
    const title = $(titles[i]).text();
    console.log(title);
  }
};
```

```js
crawler.crawl(parse)({ q: "서울대입구역 맛집" });
```

- jQuery 문법을 사용해서 html 문서를 가져오기: `const $ = cheerio.load( result )`
- 콜백함수와 매개변수를 분리하고, 화살표 함수를 연달아 사용하여, 함수를 호출 할 때 매개변수와 매개변수를 가공할 콜백함수를 입력 할 수 있다.
- `const fn = ( callback ) => ( param ) => { callback (param)}`
- `fn( result => consol.log(result.a))({a: 'one'})`

## 153 request 실행 결과 파일로 저장하기

```js
fs.appendFile("./title.txt", `${title}\n`);
```

## 154 [ejs](https://www.npmjs.com/package/ejs) 모듈 1

템플렛(Template): 응답으로 보낼 웹 페이지의 모양을 미리 만들어 표준화한 것

ejs 모듈

- [playground](https://ionicabizau.github.io/ejs-playground/)
- 동적 템플릿 엔진
- 특정 형식 문자열을 HTML 형식의 문자열로 변환
- `render()` (ejs 문자열을 HTML 문자열로 변경)
- `<% CODE %>` (자바스크립트 코드 입력)
- `<%= VALUE %>` (데이터 출력)

```
<% let table_name='Multiplication table 9 X'; %>
<% let number = '9'; %>
<h1><%= table_name %></h1>
<hr />
<% for(let i=1; i < 10; i++){ %>
<h2><%= number %> X <%= i %> = <%= number * i %></h2>
<% } %>
```

```js
const ejs = require("ejs");
const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    fs.readFile(`${__dirname}/154.example.ejs`, "utf-8", (err, data) => {
      if (err) console.log(err);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(ejs.render(data));
    });
  })
  .listen(5000, () => {
    console.log("Server running at http://127.0.0.1:5000");
  });
```

주의 사항

- `ejs.render(data)`: 데이터는 string 타입이여야 한다. `readFile(file, encoding, ()=>{})` 에 인코딩이 입력 되지 않은 경우 raw Buffer 타입이 되므로, 반드시 'utf-8'를 입력해줘야 제대로 제대로 ejs 템플릿이 출력된다.
- `ejs.renderFile(filename, (err, data) => { res.end(data)} )`
  ```js
  ejs.renderFile(`${__dirname}/154.example.ejs`, (err, data) => {
    if (err) console.log(err);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
  ```

## 155 ejs 모듈 2

`ejs.render(data, {table_name: '', number: ''}`

render 함수에의 두번째 인자로 변수가 담긴 객체를 담아서 보내고, 템플릿에서 넘겨 받은 객체의 키로 변수에 접근이 가능 하다.

```js
http
  .createServer((res, req) => {
    fs.readFile(`${__dirname}/155.example.ejs`, "utf-8", (error, data) => {
      req.writeHead(200, { "Content-Type": "text/html" });
      req.end(
        ejs.render(data, {
          table_name: "Multiplication table 19 X",
          number: "19",
        })
      );
    });
  })
  .listen(5000, () => {
    console.log("Server running at http://127.0.0.1:5000");
  });
```

## 156 Pug 모듈 1

express 프레임워크는 ejs, pug 를 템플릿으로 사용한다.
pug 태그 대신 띄어쓰기와 문자열을 사용해서 HTML 보다 보다 직관적으로 간결하게 작성이 가능해진다.

`const fn = pug.compile(data)`: pug 파일을 가져와서 html 을 반환하는 함수

`res.end(fn())`: html 데이터를 response 객체에 전달 한다.

```pug
Html
    head
        title Pug example page
        body
            h1 Hello Pug module
            h2 Nice to meet you
            a(href="https://github.com/pugjs/pug", data-set="multiple Attribute") Github for Pug
```

```js
const http = require("http");
const pug = require("pug");
const fs = require("fs");

http
  .createServer((req, res) => {
    fs.readFile(`${__dirname}/156.pug.example.pug`, "utf-8", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      const fn = pug.compile(data);
      res.end(fn());
    });
  })
  .listen(5000, () => console.log("Server running at http://127.0.0.1:5000"));
```

## pug 모듈 2

- `style.`: style 태그 입력
- `script.`: script 태그 입력
- `//`: 주석
- `#`
  - div 태그
  - `#header` -> `<div class="header"></div>`
- `.`
  - div class 속성
  - `.url` -> `<div class="url"></div>`
- `ul`: ul 태그
- `li`: li 태그

```pug
html
    head
        title Pug example page
        style.
            body{
                color: lightblue
            }
            h1{
                color: blue
            }
        script.
            let name = prompt("What is your name", "");
            alert("I'm "+ name);
        body
            // annotation
            #header
            h1 Hello Pug module
            h2 Nice to meet you
            .url
            a(href="https://github.com/pugjs/pug", data-set="multiple Attribute") Github for Pug
            ul
                li Item A
                li Item B
                li Item C
```

## pug 모듈 3

html 출력 함수에 템플렛에 변수가 담긴 객체를 전달

```js
const fn = pug.compile(data);
res.end(fn({ table_name: "19x", number: "19" }));
```

pug 특수 문자

- `#{ 값 }`: 데이터 출력
- `-`: 자바 스크립트 입력
- `=`: 데이터를 출력

```pug
html
    head
        title Pug example page
        body
            style.
            h1 #{table_name}
            h2 #{number}
            hr
            - for(let i = 1; i < 10; i++){
                p
                #multiple
                    #{number} X #{i} = #{number * i}
            - }
```
