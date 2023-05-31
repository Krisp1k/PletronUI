const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kys')
        .setDescription('Co asi dělá?')
    ,
    async run(interaction, client) {

        const allowedPlayers = [
            "653608166927368213", // Krisp1k#3920
        ]

        if (allowedPlayers.includes(interaction.member.id)) {
            await interaction.reply({
                content: "Vypínám se...",
                ephemeral: true
            });
            console.log("ZDENĚK SE VYPÍNÁ NA PŘÍKAZ COMMANDU...")
            process.exit(0);
        } else {
            await interaction.reply({
                content: "To může jen můj daddy, nikoliv ty",
                ephemeral: false
            });
        }
    }
}