const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mock')
		.setDescription(
			'Můžeš potají nastavit, aby UIIIIII napodobovala (nebo přestala napodobovat) jiného hráče'
		)
		.addStringOption((option) =>
			option
				.setName('start-stop')
				.setDescription('Zda chceš, aby bot začal napodobovat, nebo přestal')
				.setRequired(true)
				.addChoices(
					{ name: 'Start', value: 'start' },
					{ name: 'Stop', value: 'stop' }
				)
		)
		.addUserOption((option) =>
			option
				.setName('uživatel')
				.setDescription('Uživatel, u kterého chceš provést akci')
				.setRequired(true)
		),
	async run(interaction, client) {
		const msgAuthorId = interaction.user.id;
		const msgAuthorName = interaction.user.username;
		const action = interaction.options.getString('start-stop');
		const userToBeMocked = interaction.options.getUser('uživatel');
		const userToBeMockedId = userToBeMocked.id;
		const userToBeMockedName = userToBeMocked.username;

		const dataPath = path.join(__dirname, '..', '..', 'data', 'mock.json');
		const data = JSON.parse(fs.readFileSync(dataPath, 'utf8')) || {};
		const mockedPeople = data['mocked'] || {};

		if (mockedPeople[msgAuthorId]) {
			await interaction.reply({
				content: `Nemůžeš používat tento command, pokud na sobě máš mock ;)`,
				ephemeral: true,
			});
			return;
		} else if (userToBeMockedId == '1110915541469773866') {
			await interaction.reply({
				content: `To jsem já, to nemůžu`,
				ephemeral: true,
			});
			return;
		} else if (userToBeMockedId == '861583144289042472') {
			await interaction.reply({
				content: `Nemůžu tenhle command použít na ZIU, zeptejte se saeho proč.`,
				ephemeral: true,
			});
			return;
		}

		const updateMockData = async (mockedPeople) => {
			await client.log('Mock', 'Updating mock data');
			const newData = {};
			newData['mocked'] = mockedPeople;

			if (!fs.existsSync(path.dirname(dataPath))) {
				fs.mkdirSync(path.dirname(dataPath), {
					recursive: true,
				});
			}

			if (!fs.existsSync(dataPath)) {
				fs.writeFileSync(dataPath, JSON.stringify({}));
			}

			try {
				fs.writeFileSync(dataPath, JSON.stringify(newData));
			} catch (err) {
				console.error('Error writing to mock.json', err);
			}
		};

		switch (action) {
			case 'start':
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
						mockDate: new Date().toLocaleString('cs-CZ'),
					};

					mockedPeople[userToBeMockedId] = newMockedPerson;
					await updateMockData(mockedPeople);
				}

				await interaction.reply({
					content: `Budu napodobovat toho šaška <@${userToBeMockedId}>`,
					ephemeral: true,
				});

				break;

			case 'stop':
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
						content: 'Ale však tohohle nenapodobuju, zajdi si k doktoroj a z peněž co zbydou kup kredity, potřebuju na dovolenou.',
						ephemeral: true,
					});
				}

				break;
		}
	},
};
