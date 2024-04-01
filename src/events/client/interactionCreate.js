const { EmbedBuilder } = require('discord.js')

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {

		if (!interaction) return;

		if (interaction.isChatInputCommand()) {
			const { commands } = client
			const { commandName } = interaction
			const command = commands.get(commandName)

			if (!command) return;

			try {
				await command.run(interaction, client)
				await client.log("COMMAND", `Command: "${interaction.commandName}" | Options: ${JSON.stringify(interaction.options._hoistedOptions)}`, interaction.member.user.username)

			} catch (e) {
				await client.log("ERROR", `Error při spouštění příkazu ${commandName}: ${e.message}`)
				const embed = new EmbedBuilder()
					.setTitle(`něco se posralo`)
					.setColor(0x18e1ee)
					.setTimestamp(Date.now())
					.setImage('https://cdn.discordapp.com/emojis/1036414607033638983.webp?size=96&quality=lossless')

				await interaction.reply({
					embeds: [embed],
					ephemeral: true
				})
			}
		}
	}
}