const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kys')
		.setDescription('Co asi dělá?')
	,
	async run(interaction, client) {

		const allowedPlayers = [
			"653608166927368213", // krisp1k
		]

		if (allowedPlayers.includes(interaction.member.id)) {
			await interaction.reply({
				content: "Vypínám se...",
				ephemeral: true
			});
			await client.log("COMMAND", "Zdeněk se na přání příkazu vypíná", interaction.member.user.username)
			process.exit(0);
		} else {
			await interaction.reply({
				content: "Na tento příkaz nemáš oprávnění.",
				ephemeral: false
			});
		}
	}
}