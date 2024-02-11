module.exports = {
  normalizeURL(url) {
    const urlObject = new URL(url);
    let normalizedURL = `${urlObject.hostname}${urlObject.pathname}`;

    if (normalizedURL[normalizedURL.length - 1] === "/") {
      normalizedURL = normalizedURL.slice(0, -1);
    }

    return normalizedURL;
  },
};
