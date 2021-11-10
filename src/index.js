const request = require("request-promise-native");
const processHtml = require("./process-html");

const from = "de";
const to = "en";
const url = `https://www.wordreference.com/random/${from}${to}`;

const wordCount = 3;
const separator = "-";
const doReplaceLetters = false;
const doAddRandomInt = true;

(async () => {
  try {
    console.log(await generatePassword());
  } catch (e) {
    console.error(e);
  }
})();

async function generatePassword() {
  let password = "";

  for (let i = 1; i <= wordCount; i++) {
    let word = await getRandomWord();
    if (doReplaceLetters) {
      word = replaceLetters(word);
    }
    password = password + word;
    if (i < wordCount) {
      password = password + separator;
    }
  }

  if (doAddRandomInt) {
    password = password + "-" + getRandomInt(1, 9);
  }
  return password;
}

function replaceLetters(input) {
  let word = input.replace(/[i|I]/i, "1");
  word = word.replace(/[a]/i, "@");
  word = word.replace(/[o|O]/i, "0");
  word = word.replace(/[s|S]/i, "$");
  return word;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getRandomWord() {
  const html = await request({
    method: "GET",
    uri: url,
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
    },
  });
  return processHtml(html);
}
