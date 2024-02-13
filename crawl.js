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

async function crawlPage(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (response.status >= 400) {
      console.error(`Error: ${response?.status} ${response?.statusText}`);
      return;
    }

    if (!response.headers.get("Content-Type").includes("text/html")) {
      console.error("Error: invalid Content-Type");
      return;
    }

    console.log(await response.text());
  } catch (error) {
    console.error(await error.message);
  }
}

module.exports = {
  crawlPage,
  normalizeURL,
  getURLsFromHTML,
};
