const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    client.fetchClans = async () => {

        const browser = await puppeteer.launch({ headless: 'new' });
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

        const clans = {};
        let serverNum = 3 // start;

        pages.forEach((pageContent, ) => {
            const newContent = pageContent.replace(/&gt/g, "");
            newContent.split("\n").forEach((contentLine) => {
                const contentPiece = contentLine.split(";");

                const mapType = contentPiece[2];
                if (mapType != "k1") return;

                const klanName = contentPiece[7];
                if (klanName === "clan_name" || !klanName) return;

                const memberName = contentPiece[5];
                const x = parseInt(contentPiece[0]);
                const y = parseInt(contentPiece[1]);

                const lowerCaseKlanName = klanName.toLowerCase();

                clans[lowerCaseKlanName] = clans[lowerCaseKlanName] || {};
                clans[lowerCaseKlanName]["name"] = klanName;
                clans[lowerCaseKlanName]["server"] = serverNum;
                clans[lowerCaseKlanName]["members"] = clans[lowerCaseKlanName]["members"] || [];

                if (memberName && clans[lowerCaseKlanName]["members"].find((member) => member.name === memberName) === undefined) {
                    const newMember = {
                        name: memberName,
                        x_cord: x,
                        y_cord: y
                    }

                    clans[lowerCaseKlanName]["members"].push(newMember);
                }
            });
            serverNum++;
        });

        // check if the file exists. if not create it empty and then write
        if (!fs.existsSync('src/data/clans.json')) {
            fs.writeFileSync('src/data/clans.json', JSON.stringify({}));
        }

        fs.writeFileSync('src/data/clans.json', JSON.stringify(clans));
        client.clans = clans;

        console.log("[CRON] Clans updated")
    }
}