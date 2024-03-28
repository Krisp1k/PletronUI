const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = require("isomorphic-fetch");

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
        const response = await ask(interaction.options.getString("otazka"));

        console.log("[AI] Response: " + response);
        await interaction.editReply({
            content: response,
            ephemeral: false,
        })
    },
};
