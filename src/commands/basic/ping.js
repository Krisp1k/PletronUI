const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ukáže ping'),
        
    async run(interaction, client) {
        const sentTimestamp = Date.now();
        await interaction.reply('Pinguju...');
        const latency = Date.now() - sentTimestamp;
        await interaction.editReply(`**:globe_with_meridians:  API \t[${client.ws.ping}ms]\n:desktop:  Odezva \t[${latency}ms]**`)
    }
}