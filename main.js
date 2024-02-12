const crawler = require("./crawl.js");

const url = "https://blog.boot.dev";
const htmlBody =
  "<html><body><a href='/toto/tata'><span>Go to Boot.dev</span></a><a href='https://www.youtube.com'>youtube</a></body></html>";

console.log(crawler.getURLsFromHTML(htmlBody, url));
