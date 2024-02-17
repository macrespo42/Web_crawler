const { argv } = require("node:process");
const { crawlPage } = require("./crawl.js");

async function main() {
  if (argv.length <= 2) {
    console.error("Error: give a website url to crawl");
  } else if (argv.length > 3) {
    console.error("Error: too many arguments");
  } else {
    const baseURL = argv[2];
    console.log(`Crawling website: ${baseURL}`);
    const pages = await crawlPage(baseURL, baseURL, {});
    console.log(pages);
  }
}

main();
