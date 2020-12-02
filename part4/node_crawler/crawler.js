const request = require("request");
const iconv = require("iconv-lite");
const charset = require("charset");
const cheerio = require("cheerio");
const http = require("http");

// crawl( ()=>{} )( {q: '검색어'} )
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

// const getTitles = (result) => {
//   const $ = cheerio.load(result);
//   const title = $("h3").find("a");
//   console.log(title.length);
// };

// const printPage = (result) => {
//   http
//     .createServer((req, res) => {
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.end(result);
//     })
//     .listen(5000, () => {
//       console.log("server running at http://127.0.0.1:5000");
//     });
// };

// crawl(getTitles)({ q: "서울" });
// crawl(printPage)({ q: "서울" });

module.exports.crawl = crawl;
