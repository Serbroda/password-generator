const request = require("request-promise-native");
const processHtml = require("./process-html");

const from = "de";
const to = "en";
const url = `https://www.wordreference.com/random/${from}${to}`;

(async () => {
  try {
    const word1 = processHtml(await getRandomWord());
    const word2 = processHtml(await getRandomWord());
    const word3 = processHtml(await getRandomWord());
    const password = `${word1}-${word2}-${word3}-${getRandomIntInclusive(
      1,
      9
    )}`;
    console.log(password);
  } catch (e) {
    console.error(e);
  }
})();

function replaceLetters(input) {
  let word = input.replace(/[i|I]/i, "1");
  word = word.replace(/[a]/i, "@");
  word = word.replace(/[o|O]/i, "0");
  word = word.replace(/[s|S]/i, "$");
  return word;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getRandomWord() {
  return await request({
    method: "GET",
    uri: url,
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
    },
  });
}
