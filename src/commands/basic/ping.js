const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ukáže ping'),
        
    async run(interaction, client) {

        const embed = new EmbedBuilder()
            .setTitle("Ping")
            .setColor(0x18e1ee)
            .setTimestamp(Date.now())
            .setDescription("🤖 API : " + client.ws.ping + "ms")

        await interaction.reply({
            embeds: [embed],
        })
    }
}