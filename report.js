function printReport(pages) {
  console.log("Starting report: ");
  let pagesArr = [];
  for (const key in pages) {
    pagesArr.push({ url: key, count: pages[key] });
  }

  pagesArr = pagesArr.sort((a, b) => {
    if (a.count > b.count) {
      return -1;
    } else if (a.count < b.count) {
      return 1;
    }
    return 0;
  });

  for (const page of pagesArr) {
    console.log(`Found ${page.count} internal link to ${page.url} `);
  }
}

module.exports = {
  printReport,
};
