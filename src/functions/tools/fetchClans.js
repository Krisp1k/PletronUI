const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

module.exports = (client) => {
	client.fetchClans = async () => {
		let serverNum = 3; // start;
		const clans = {
			"clanList": [], // TO BE UPDATED 
			"lastUpdateTime": new Date(),
		};

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

		pages.forEach((pageContent) => {
			const newContent = pageContent.replace(/&gt/g, "");
			newContent.split("\n").forEach((contentLine) => {
				const contentPiece = contentLine.split(";");

				const mapType = contentPiece[2];
				if (mapType !== "k1") return;

				const klanName = contentPiece[7];
				if (klanName === "clan_name" || !klanName) return;

				const memberName = contentPiece[5];
				const x = parseInt(contentPiece[0]);
				const y = parseInt(contentPiece[1]);

				const lowerCaseKlanName = klanName.toLowerCase();
				clans["clanList"][lowerCaseKlanName] = clans["clanList"][lowerCaseKlanName] || {};

				if (clans["clanList"][lowerCaseKlanName]) {
					clans["clanList"][lowerCaseKlanName]["name"] = klanName;
					clans["clanList"][lowerCaseKlanName]["server"] = serverNum;
					clans["clanList"][lowerCaseKlanName]["members"] = clans["clanList"][lowerCaseKlanName]["members"] || [];

					if (memberName && !clans["clanList"][lowerCaseKlanName]["members"].some((member) => member.name === memberName)) {
						clans["clanList"][lowerCaseKlanName]["members"].push({
							name: memberName,
							x_cord: x,
							y_cord: y
						});
					}
				}
			});
			serverNum++;
		});

		const dataPath = path.join(__dirname, '..', '..', 'data', 'clans.json');

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
