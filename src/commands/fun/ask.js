const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ask")
		.setDescription("Zeptej se Lorda Pletrona!")
		.addStringOption((option) =>
			option
				.setName("otazka")
				.setDescription("Jakou otázku chceš položit?")
				.setRequired(true)
				.setMaxLength(125)
		),
	async run(interaction, client) {

		await interaction.deferReply({
			content: "Dej mi chvilku, přemýšlím...",
			ephemeral: false,
		});

		const ask = (await import("../../config/OpenAI_API.mjs")).askResponse;
		const response = await ask(interaction.options.getString("otazka"), client);

		await client.log("AI", interaction.user.tag + " asked: " + interaction.options.getString("otazka") + " - " + response);
		await interaction.editReply({
			content: response,
			ephemeral: false,
		})
	},
};
