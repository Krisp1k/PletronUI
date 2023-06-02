const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ukáže ping'),

    async run(interaction, client) {

        const sentTimestamp = Date.now();
        await interaction.reply('Pinguju...');

        const latency = Date.now() - sentTimestamp;
        const startTime = client.startTime
        const nowTime = new Date();
        const uptimeDifference = nowTime - startTime

        const getTimeDifference = (start, end) => {
            const timeDiff = Math.abs(end.getTime() - start.getTime());

            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
          
            return { days, hours, minutes };
        }

        const { days, hours, minutes } = getTimeDifference(startTime, nowTime);

        await interaction.editReply({
            content: `:globe_with_meridians:  API: **${client.ws.ping}ms**\n:desktop:  Odezva: **${latency}ms**\n:clock4:  Uptime: **${days}d, ${hours}h, ${minutes}min**`,
            ephemeral: false
        })
    }
}