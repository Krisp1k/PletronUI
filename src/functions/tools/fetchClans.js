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

        // console.log(serveryKlany[2][0]);
        // console.log(serveryKlany[2][0].includes("s3"))

        for (let i = 3; i <= 7; i++)
        {
            const url = `https://www.panhradu.cz/globe_serialize.aspx?id_server=${i}`;

            const browser = await puppeteer.launch({ headless: true })
            const page = await browser.newPage()
            await page.goto(url)
            const pageContent = await page.content()
            await page.close()
            await browser.close()
            const newContent = pageContent.replace(/&gt/g, "")

            const makeArray = (contentLine) => {
                const contentPiece = contentLine.split(";")
                const klanName = contentPiece[7]

                if (klanName == "clan_name" || klanName == "" || klanName == undefined)
                {
                    return;
                }

                if (!serveryKlany[i-3].includes(klanName.toLowerCase()))
                {
                    serveryKlany[i-3].push(klanName.toLowerCase());
                }
            }

            newContent.split("\n").forEach(contentLine => makeArray(contentLine))
        }

        //console.log(serveryKlany)

        const file = fs.createWriteStream('src/data/klany.txt');
        file.on('error', function(err) { console.error(err); return; });
        serveryKlany.forEach(function(v) { file.write(v.join(', ').toLowerCase() + '\n'); });
        file.end();
        
        console.log("klany obnoveny")
    }
}