const puppeteer = require('puppeteer');
const fs = require('fs');

module.exports = (client) => {
    client.fetchClans = async () => {

        const serveryKlany = [
            [], // 3
            [], // 4
            [], // 5
            [], // 6
            [], // 7
        ]

        const makeArray = (contentLine, i) => {
            const contentPiece = contentLine.split(";");
            const klanName = contentPiece[7];

            if (klanName === "clan_name" || !klanName) {
                return;
            }

            const lowercaseKlanName = klanName.toLowerCase();
            if (!serveryKlany[i].includes(lowercaseKlanName)) {
                serveryKlany[i].push(lowercaseKlanName);
            }
        };

        const browser = await puppeteer.launch({ headless: true });
        const pages = await Promise.all(
            Array.from({ length: 5 }, (_, i) => i + 3).map((i) =>
                browser.newPage().then((page) =>
                    page.goto(`https://www.panhradu.cz/globe_serialize.aspx?id_server=${i}`)
                        .then(() => page.content())
                        .finally(() => page.close())
                )
            )
        );
        await browser.close();

        pages.forEach((pageContent, i) => {
            const newContent = pageContent.replace(/&gt/g, "");
            newContent.split("\n").forEach((contentLine) => makeArray(contentLine, i));
        });

        const file = fs.createWriteStream('src/data/klany.txt');

        file.on('error', function (err) { 
            return console.error(err); 
        });

        serveryKlany.forEach(function (v) {
            file.write(v.join(', ').toLowerCase() + '\n');
        });
        
        file.end();

        console.log("klany obnoveny")
    }
}