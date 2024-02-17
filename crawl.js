const { JSDOM } = require("jsdom");

function normalizeURL(url) {
  const urlObject = new URL(url);
  let normalizedURL = `${urlObject.hostname}${urlObject.pathname}`;

  if (normalizedURL[normalizedURL.length - 1] === "/") {
    normalizedURL = normalizedURL.slice(0, -1);
  }

  return normalizedURL;
}

function getURLsFromHTML(htmlBody, baseURL) {
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
}

async function crawlPage(baseURL, currentURL, pages) {
  // if note same domain stop
  const baseUrlObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);
  if (baseUrlObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  const normalizedURL = normalizeURL(currentURL);
  if (pages[normalizedURL] > 0) {
    pages[normalizedURL]++;
    return pages;
  }

  if (currentURL === baseURL) {
    pages[normalizedURL] = 0;
  } else {
    pages[normalizedURL] = 1;
  }

  console.log(`Crawling ${currentURL}...`);
  try {
    const response = await fetch(currentURL, {
      method: "GET",
    });

    if (response.status >= 400) {
      console.error(`Error: ${response?.status} ${response?.statusText}`);
      return pages;
    }

    if (!response.headers.get("Content-Type").includes("text/html")) {
      console.error("Error: invalid Content-Type");
      return pages;
    }
    const urls = getURLsFromHTML(await response.text(), baseURL);

    for (let i = 0; i < urls.length; i++) {
      pages = await crawlPage(baseURL, urls[i], pages);
    }
  } catch (error) {
    console.error(error.message);
  }
  return pages;
}

module.exports = {
  crawlPage,
  normalizeURL,
  getURLsFromHTML,
};
