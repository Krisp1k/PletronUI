const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("mock")
		.setDescription(
			"Můžeš potají nastavit, aby UIIIIII napodobovala (nebo přestala napodobovat) jiného hráče"
		)
		.addStringOption((option) =>
			option
				.setName("start-stop")
				.setDescription(
					"Zda chceš, aby bot začal napodobovat, nebo přestal"
				)
				.setRequired(true)
				.addChoices(
					{ name: "Start", value: "start" },
					{ name: "Stop", value: "stop" },
					{ name: "List", value: "list" }
				)
		)
		.addUserOption((option) =>
			option
				.setName("uživatel")
				.setDescription("Uživatel, u kterého chceš provést akci")
				.setRequired(true)
		),
	async run(interaction, client) {
		const msgAuthorId = interaction.user.id;
		const msgAuthorName = interaction.user.username;
		const action = interaction.options._hoistedOptions[0].value;
		const userToBeMockedId = interaction.options._hoistedOptions[1].value;
		const userToBeMockedName =
			interaction.options._hoistedOptions[1].user.username;

		const data =
			JSON.parse(fs.readFileSync("src/data/mock.json", "utf8")) || {};
		const mockedPeople = data["mocked"] || {};

		if (mockedPeople[msgAuthorId]) {
			await interaction.reply({
				content: `Nemůžeš používat tento command, pokud na sobě máš mock ;)`,
				ephemeral: true,
			});
			return;
		} else if (userToBeMockedId == "1110915541469773866") {
			await interaction.reply({
				content: `To jsem já, to nemůžu`,
				ephemeral: true,
			});
			return;
		} else if (userToBeMockedId == "861583144289042472") {
			await interaction.reply({
				content: `Nemůžu tenhle command použít na ZIU, zeptejte se saeho proč.`,
				ephemeral: true,
			});
			return;
		}

		const updateMockData = async (mockedPeople) => {

			await client.log("Mock", "Updating mock data")
			const newData = {};
			newData["mocked"] = mockedPeople;

			if (!fs.existsSync(path.dirname("src/data/mock.json"))) {
				fs.mkdirSync(path.dirname("src/data/mock.json"), {
					recursive: true,
				});
			}

			if (!fs.existsSync("src/data/mock.json")) {
				fs.writeFileSync("src/data/mock.json", JSON.stringify({}));
			}

			try {
				fs.writeFileSync("src/data/mock.json", JSON.stringify(newData));
			} catch (err) {
				console.error("Error writing to mock.json", err);
			}
		};

		switch (action) {
			case "start":
				if (mockedPeople[userToBeMockedId]) {
					await interaction.reply({
						content: `Jeho už napodobuju, psssst.....`,
						ephemeral: true,
					});
					return;
				}

				if (!mockedPeople[userToBeMockedId]) {
					const newMockedPerson = {
						id: userToBeMockedId,
						username: userToBeMockedName,
						mockedBy: msgAuthorName,
						mockDate: new Date().toLocaleString("cs-CZ"),
					};

					mockedPeople[userToBeMockedId] = newMockedPerson;
					await updateMockData(mockedPeople);
				}

				await interaction.reply({
					content: `Budu napodobovat toho šaška <@${userToBeMockedId}>`,
					ephemeral: true,
				});

				break;

			case "stop":
				let mockCancelled = false;

				if (mockedPeople[userToBeMockedId]) {
					delete mockedPeople[userToBeMockedId];
					await updateMockData(mockedPeople);
					mockCancelled = true;
				}

				if (mockCancelled) {
					await interaction.reply({
						content: `Přestanu napodobovat tohohle šaška <@${userToBeMockedId}>`,
						ephemeral: true,
					});
				} else {
					await interaction.reply({
						content:
							"Ale však tohohle nenapodobuju, zajdi si k doktoroj a z peněž co zbydou kup kredity, potřebuju na dovolenou.",
						ephemeral: true,
					});
				}

				break;

			case "list":
				const mockedData = fs.readFileSync("src/data/mock.json", "utf8");
				const mockedPeopleArray = Object.values(mockedData);
				const mockedPeopleString = mockedPeopleArray.map((person) => {
					return `<@${person.id}> | od: ${person.mockDate} | autor: ${person.mockedBy} `;
				});

				await interaction.reply({
					content: `Seznam napodobených lidí: \n${mockedPeopleString.join("\n")} `,
					ephemeral: true,
				});
				break;
		}
	},
};
