const crawler = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalize url https", () => {
  expect(crawler.normalizeURL("https://blog.boot.dev/path/")).toBe(
    "blog.boot.dev/path",
  );

  expect(crawler.normalizeURL("https://blog.boot.dev/path")).toBe(
    "blog.boot.dev/path",
  );
});

test("normalize url http", () => {
  expect(crawler.normalizeURL("http://blog.boot.dev/path/")).toBe(
    "blog.boot.dev/path",
  );

  expect(crawler.normalizeURL("http://blog.boot.dev/path")).toBe(
    "blog.boot.dev/path",
  );
});

test("normalize url root ", () => {
  expect(crawler.normalizeURL("https://blog.boot.dev")).toBe("blog.boot.dev");
  expect(crawler.normalizeURL("https://blog.boot.dev/")).toBe("blog.boot.dev");
});

test("normalize url Capitalize", () => {
  expect(crawler.normalizeURL("http://BLOG.boot.dev/")).toBe("blog.boot.dev");
});

test("getURLsFromHTML with an absolute url", () => {
  expect(
    crawler.getURLsFromHTML(
      "<html><body><a href='https://www.blog.boot.dev'><span>Go to Boot.dev</span></a></body></html>",
      "https://www.blog.boot.dev",
    ),
  ).toStrictEqual(["https://www.blog.boot.dev/"]);

  expect(
    crawler.getURLsFromHTML(
      "<html><body><a href='https://www.blog.boot.dev'><span>Go to Boot.dev</span></a></body></html>",
      "https://www.blog.boot.dev",
    )[0],
  ).toBe("https://www.blog.boot.dev/");
});

test("getURLsFromHTML with an relative url", () => {
  expect(
    crawler.getURLsFromHTML(
      "<html><body><a href='/toto/tata'><span>Go to Boot.dev</span></a></body></html>",
      "https://www.blog.boot.dev",
    ),
  ).toStrictEqual(["https://www.blog.boot.dev/toto/tata/"]);

  expect(
    crawler.getURLsFromHTML(
      "<html><body><a href='/toto/tata'><span>Go to Boot.dev</span></a></body></html>",
      "https://www.blog.boot.dev",
    )[0],
  ).toBe("https://www.blog.boot.dev/toto/tata/");
});

test("getURLsFromHTML with multiple urls", () => {
  expect(
    crawler.getURLsFromHTML(
      "<html><body><a href='/toto/tata'><span>Go to Boot.dev</span></a><a href='https://www.youtube.com'>youtube</a></body></html>",
      "https://www.blog.boot.dev",
    ),
  ).toStrictEqual([
    "https://www.blog.boot.dev/toto/tata/",
    "https://www.youtube.com/",
  ]);

  expect(
    crawler.getURLsFromHTML(
      "<html><body><a href='/toto/tata'><span>Go to Boot.dev</span></a><a href='https://www.youtube.com'>youtube</a></body></html>",
      "https://www.blog.boot.dev",
    )[0],
  ).toBe("https://www.blog.boot.dev/toto/tata/");

  expect(
    crawler.getURLsFromHTML(
      "<html><body><a href='/toto/tata'><span>Go to Boot.dev</span></a><a href='https://www.youtube.com'>youtube</a></body></html>",
      "https://www.blog.boot.dev",
    )[1],
  ).toBe("https://www.youtube.com/");
});
