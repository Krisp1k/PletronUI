const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Zobrazí všechny dostupné příkazy"),
    async run(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle("Seznam všech dostupných příkazů")
            .setColor(0x18e1ee)
            .setTimestamp(Date.now());

        const ignoredCommands = ["scan", "lp", "kys"];

        client.commandArray.forEach((command) => {
            if (!ignoredCommands.includes(command.name)) {
                embed.addFields({
                    name: "/" + command.name,
                    value: command.description,
                    inline: true,
                });
            }
        });

        await interaction.reply({
            embeds: [embed],
            ephemeral: false,
        });
    },
};
