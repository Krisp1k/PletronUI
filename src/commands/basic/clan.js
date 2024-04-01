const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const puppeteer = require("puppeteer");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("klan")
		.setDescription("Zobrazí seznam členů v klanu")
		.addStringOption((option) =>
			option
				.setName("název")
				.setDescription(
					"Název klanu přesně tak, jak ho lze nalézt ve hře"
				)
				.setRequired(true)
				.setMaxLength(64)
		),

	async run(interaction, client) {

		// this command is under maintenance
		return await interaction.reply({
			content:
				"Tento příkaz je momentálně nedostupný, promiň.",
			ephemeral: true,
		});

		let vyhledavanyKlan = interaction.options.getString("název");
		let finalString = "";

		const chunks = [];

		fs.readFileSync("src/data/clans.json", "utf8", async (err, data) => {

			if (err) {
				console.error("Error reading file:", err);
				return;
			}

			try {
				const clansJson = JSON.parse(data);
				const lowercaseVyhledavanyKlan = vyhledavanyKlan.toLowerCase();
				const clanMembers = clansJson["clanList"][lowercaseVyhledavanyKlan]["members"];

				for (const member of clanMembers) {
					const tempString = `**:bust_in_silhouette: ${member.name}** - [[${member.x_cord},${member.y_cord}]](https://panhradu.cz/main.aspx?x=${member.x_cord}&y=${member.y_cord})\n`;
					const finalStringLen = finalString.length;
					const tempStringLen = tempString.length - 15;

					if (finalStringLen + tempStringLen >= 2000) {
						chunks.push(finalString);
						finalString = tempString;
					} else {
						finalString += tempString;
					}
				}

				chunks.push(finalString);
				if (finalString == null || finalString == "") {
					await interaction.reply({
						content:
							"Tento klan nebyl nalezen\nhttps://cdn.discordapp.com/emojis/1036414607033638983.webp?size=96&quality=lossless",
						ephemeral: true,
					});
					return;
				}

				await interaction.reply({ content: chunks[0], ephemeral: true });

				for (let i = 1; i <= chunks.length; i++) {
					await interaction.followUp({
						content: chunks[i],
						ephemeral: true,
					});
				}

			} catch (err) {
				await client.log("ERROR", "Error parsing JSON:" + err.message)
			}
		});
	},
};
