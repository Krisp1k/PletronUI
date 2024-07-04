const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

module.exports = (client) => {

    client.convertGlobeSerializeToJSON = async (pageContent) => {
        const result = {
            players: [],
        };
        let lastLine = null;
        let lastLineData = [];

        pageContent = pageContent.replace(/&gt/g, "").split("\n").slice(3);
        pageContent = pageContent;

        for (let i = 0; i < pageContent.length; i++) {
            if (lastLine == null) {
                lastLine = pageContent[i];
                lastLineData = lastLine.split(";");
            }

            let mapX, mapY, mapType, mapBuilding, playerId, playerName, playerClanId, playerClanName, playerClanFlag;
            let penalty = 0;
            const contentLine = pageContent[i].split(";");

            if (contentLine.length < 10) {
                mapX = lastLineData[0] || null;
                mapY = lastLineData[1] || null;
                mapType = lastLineData[2] || null;
                penalty = 3;
            } else {
                mapX = contentLine[0] || null;
                mapY = contentLine[1] || null;
                mapType = contentLine[2] || null;
            }

            mapBuilding = contentLine[3 - penalty] || null;
            playerId = contentLine[4 - penalty] || null;
            playerName = contentLine[5 - penalty] || null;
            playerClanId = contentLine[6 - penalty] || null;
            playerClanName = contentLine[7 - penalty] || null;
            playerClanFlag = contentLine[8 - penalty] || null;

            if (playerName) {
                result.players.push({
                    mapX: mapX,
                    mapY: mapY,
                    mapType: mapType,
                    mapBuilding: mapBuilding,
                    playerId: playerId,
                    playerName: playerName,
                    playerClanId: playerClanId,
                    playerClanName: playerClanName,
                    playerClanFlag: playerClanFlag,
                });
            }
        }

        return result;
    }

	client.fetchClans = async () => {

        let error = false;
        let pages;
		const clans = {
			"clanList": [], // TO BE UPDATED 
			"lastUpdateTime": new Date(),
		};
		const dataPath = path.join(__dirname, '..', '..', 'data', 'clans.json');

        try {
            const browser = await puppeteer.launch({ headless: 'new' });
            pages = await Promise.all(
                Array.from({ length: 5 }, (_, i) => i + 3).map((i) =>
                    browser.newPage().then((page) =>
                        page.goto(`https://www.panhradu.cz/globe_serialize.aspx?id_server=${i}`)
                            .then(() => page.content())
                            .finally(() => page.close())
                    )
                )
            );
		    await browser.close();
        } catch(e) {
            client.log('ERROR', e.message)
            error = true;
        }

        if (error) return;

		const promises = pages.map((pageContent) => {
            return client.convertGlobeSerializeToJSON(pageContent);
        });

        try {
            let serverNum = 3; // start;
            const results = await Promise.all(promises);

            results.forEach(result => {
                if (result && result.players) {
                    if (!clans.clanList[serverNum]) {
                        clans.clanList[serverNum] = { 
                            ServerNumber: serverNum,
                            Clans: {} 
                        };
                    }

                    for (let player of result.players) {
                        if (!clans.clanList[serverNum]["Clans"][player.playerClanId]) {
                            clans.clanList[serverNum]["Clans"][player.playerClanId] = { 
                                ClanName: player.playerClanName || "", 
                                Players: [] 
                            };
                        }
                        clans.clanList[serverNum]["Clans"][player.playerClanId]["ClanName"]
                        clans.clanList[serverNum]["Clans"][player.playerClanId]["Players"].push(player);
                    }
                    serverNum++;
                }
            });
    
            // Update the last update time
            clans.lastUpdateTime = new Date().toDateString();
        } catch (error) {
            console.error('Error fetching player data:', error);
        }

		// Check if the directory exists. If not, create it.
		const dataDir = path.dirname(dataPath);
		if (!fs.existsSync(dataDir)) {
			fs.mkdirSync(dataDir, { recursive: true });
		}

		fs.writeFileSync(dataPath, JSON.stringify(clans));
		client.clans = clans;
		client.log('CRON', 'Clans fetched and saved to file');
	}
}