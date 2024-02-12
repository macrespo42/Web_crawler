const { JSDOM } = require("jsdom");

module.exports = {
  normalizeURL(url) {
    const urlObject = new URL(url);
    let normalizedURL = `${urlObject.hostname}${urlObject.pathname}`;

    if (normalizedURL[normalizedURL.length - 1] === "/") {
      normalizedURL = normalizedURL.slice(0, -1);
    }

    return normalizedURL;
  },

  getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linksTags = dom.window.document.querySelectorAll("a");

    for (const link of linksTags) {
      if (link.href.startsWith("http")) {
        urls.push(link.href);
      } else {
        urls.push(baseURL + link.href + "/");
      }
    }

    return urls;
  },
};
