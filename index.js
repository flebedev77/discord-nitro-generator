const fs = require('fs');
const chalk = require("chalk")
const readline = require("readline")


function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

function getToken() {
    console.clear();
    console.log(chalk.bgGrey("If you want to stop generating discord NITRO then press CTRL+C or just close this window"));
    console.log(chalk.bold.bgGreen("Generating Token..."));
    fetch("https://api.discord.gx.games/v1/direct-fulfillment", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
            "content-type": "application/json",
            "sec-ch-ua": "\"Opera GX\";v=\"105\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            "Referer": "https://www.opera.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": `{\"partnerUserId\":"${generateNewPartnerUserId()}"}`,
        "method": "POST"
    }).then((res) => {
        if (res.ok) return res.json();
    }).then((data) => {
        if (data && data.token) {
            writeToken(data.token);
        } else {
            getToken();
        }
    })
}
function writeToken(token) {
    console.clear();
    console.log(chalk.bgGrey("If you want to stop generating discord NITRO then press CTRL+C or just close this window"));
    console.log(chalk.bold.bgGreenBright("Writing token.."));

    if (fs.existsSync("nitro.txt") == false) {
        fs.open('nitro.txt', 'w', function (err, file) {
            if (err) throw err;
            console.log(chalk.italic.yellow('File did not exist... Creating a new file'));
        });
    } else {
        fs.appendFileSync('nitro.txt', "https://discord.com/billing/partner-promotions/1180231712274387115/" + token + "\n");
    }

    if (fs.existsSync("nitro.txt") == false) {
        console.log(chalk.bold.redBright("Could not write nitro link... Trowing it away :("));
    }

    //setTimeout(getToken, 1000)
    getToken();
}
function generateNewPartnerUserId() {
    let example = "3b52d946f24a07630458c9e8bc12705c2eae2e8a5172678a55bb41fe81531977";
    let items = "abcdefghijklmnopqrstuvwxyz1234567890";
    let generated = "";

    for (let i = 0; i < example.length; i++) {
        generated += items.charAt(Math.floor(Math.random() * items.length));
    }
    return example;
}

async function begin() {
    console.log(chalk.blue('Discord Nitro') + chalk.italic.yellow(" genetator by ") + chalk.bold.red("flebedev77"))

    //const option = await askQuestion("Pick one of the following options " + chalk.bold.red("Fast mode, generates nitro very quickly but migh"));

    const ans = await askQuestion("Press any key to begin generating " + chalk.bold.blue("🚀NITRO🚀"));

    console.clear();

    getToken();
}
begin();