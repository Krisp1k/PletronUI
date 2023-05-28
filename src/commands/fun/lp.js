const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lp')
        .setDescription('Odpoví ti 😏'),
    async run(interaction, client) {

        const replyPromise = client.randomPletronReply().then(async (reply) => {
            await interaction.reply({content: reply, ephemeral: false})
        })
    }
}