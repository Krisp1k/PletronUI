const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('logs')
		.setDescription('Posledních 10 logů.')
	,
	async run(interaction, client) {

		const allowedPlayers = [
			"653608166927368213", // krisp1k
		]

		if (allowedPlayers.includes(interaction.member.id)) {
			let logMessage = "```";
			for (const log of client.logMessages) {
				logMessage += `${log.time} [${log.type}] - ${log.author} - ${log.message}\n`;
			}
			logMessage += "```";

			await interaction.reply({
				content: logMessage,
				ephemeral: true
			});

		} else {
			await interaction.reply({
				content: "Na tento příkaz nemáš oprávnění.",
				ephemeral: false
			});
		}
	}
}