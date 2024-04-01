const { SlashCommandBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Vymaže předchozí zprávy')
		.addIntegerOption(option =>
			option.setName('počet')
				.setDescription('Počet zpráv, které chceš mazat (0-100)')
				.setRequired(true)
		),
	async run(interaction, client) {

		const amount = interaction.options.getInteger('počet');

		if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
			return await interaction.reply({
				content: 'Na použití tohoto příkazu potřebuješ oprávnění **ManageMessages**.',
				ephemeral: true
			});
		}

		if (amount <= 0 || amount > 100) {
			return await interaction.reply({
				content: 'Zadej číslo od 1 do 100 prosím (a taky si prosím kup kredity)',
				ephemeral: true
			});
		}

		try {
			const channel = interaction.channel;
			const messages = await channel.messages.fetch({
				limit: amount
			});

			await channel.bulkDelete(messages);
			await interaction.reply({
				content: `Smazal jsem posledních ${amount} zpráv.`,
				ephemeral: true
			});

		} catch (error) {
			await client.log('ERROR', `Error při mazání posledních ${amount} zpráv: ${error}` + error.message);
			await interaction.reply({
				content: `Error při mazání posledních ${amount} zpráv: ${error}`,
				ephemeral: true
			});
		}
	},
};