const cheerio = require("cheerio");

module.exports = (html) => {
    const $ = cheerio.load(html);
    const word = $("h3.headerWord").text();
    return word;
};
