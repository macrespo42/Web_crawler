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

test("normalize root url", () => {
  expect(crawler.normalizeURL("https://blog.boot.dev")).toBe("blog.boot.dev");
  expect(crawler.normalizeURL("https://blog.boot.dev/")).toBe("blog.boot.dev");
});

test("normalize url Capitalize", () => {
  expect(crawler.normalizeURL("http://BLOG.boot.dev/")).toBe("blog.boot.dev");
});
