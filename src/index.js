const request = require("request-promise-native");
const processHtml = require("./process-html");
const commandLineArgs = require("command-line-args");

const optionDefinitions = [
    { name: "from", alias: "f", type: String },
    { name: "to", alias: "t", type: String },
    { name: "number-of-words", alias: "n", type: Number },
    { name: "separator", alias: "s", type: String },
    { name: "random-number", alias: "r", type: Boolean },
    { name: "letter-replace", alias: "l", type: Boolean },
];

const options = {
    ...{
        from: "en",
        to: "en",
        "number-of-words": 3,
        separator: "-",
        "random-number": false,
        "letter-replace": false,
    },
    ...commandLineArgs(optionDefinitions),
};

const url = `https://www.wordreference.com/random/${options.from}${options.to}`;

(async () => {
    try {
        console.log(await generatePassword());
    } catch (e) {
        switch (e.statusCode) {
            case 404:
                console.error(`URL ${url} not found`);
                break;
            default:
                console.error(e);
                break;
        }
    }
})();

async function generatePassword() {
    let password = "";

    const numberOfWords = options["number-of-words"];
    const letterReplace = options["letter-replace"];

    for (let i = 1; i <= numberOfWords; i++) {
        let word = await getRandomWord();
        if (letterReplace) {
            word = replaceLetters(word);
        }
        password = password + word;
        if (i < numberOfWords) {
            password = password + options.separator;
        }
    }

    if (options["random-number"]) {
        password = password + options.separator + getRandomInt(1, 9);
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
