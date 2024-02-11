const crawler = require("./crawl.js");

const url = crawler.normalizeURL("https://www.google.com");
console.log(url);
