const fs = require('fs');
function getToken() {
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
        console.log("Token generated.");
        writeToken(data.token);
    })
}
function writeToken(token) {
    console.log("Writing token.");

    if (fs.existsSync("nitro.txt") == false) {
        fs.open('nitro.txt', 'w', function (err, file) {
            if (err) throw err;
            console.log('File did not exist... Creating a new file');
        });
    } else {
        fs.appendFileSync('nitro.txt', "https://discord.com/billing/partner-promotions/1180231712274387115/" + token + "\n");
    }

    if (fs.existsSync("nitro.txt") == false) {
        console.log("Could not write nitro link... Trowing it away :(");
    }

    console.log("Requesting Token");
    setTimeout(getToken, 1000)
}
function generateNewPartnerUserId() {
    let example = "3b52d946f24a07630458c9e8bc12705c2eae2e8a5172678a55bb41fe81531977";
    let items = "abcdefghijklmnopqrstuvwxyz1234567890";
    let generated = "";

    for (let i = 0; i < example.length; i++) {
        generated += items.charAt(Math.floor(Math.random() * items.length));
    }
    return generated;
}

getToken();