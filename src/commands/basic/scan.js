const { SlashCommandBuilder, PermissionsBitField } = require('discord.js')
const puppeteer = require('puppeteer');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('scan')
		.setDescription('Vyhodí člena za porušení pravidel')
		.addStringOption(option =>
			option.setName('x')
				.setDescription('X souřadnice')
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName('y')
				.setDescription('Y souřadnice')
				.setRequired(true)
		),
	async run(interaction, client) {

		// this command is under maintenance
		return await interaction.reply({
			content:
				"Tento příkaz je momentálně nedostupný, promiň.",
			ephemeral: true,
		});

		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		const cookies = [
			{
				name: 'PH_token',
				value: '1f309b4e-ccb4-45b3-a628-2e08b8d9667d',
				domain: 'www.panhradu.cz',
			},
			{
				name: 'ASP.NET_SessionId',
				value: 'kekzpt5b140ns5ncxhvgeq2d',
				domain: 'www.panhradu.cz',
			},
		];

		await page.setCookie(...cookies);
		await page.goto('https://www.panhradu.cz/player_to_session.aspx?id=205881');
		const pageContent = await page.content()
		await page.close();
		await browser.close();
	}
}