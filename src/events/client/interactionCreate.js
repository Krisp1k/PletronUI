const { InteractionType } = require('discord.js')

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const { commands } = client
            const { commandName } = interaction
            const command = commands.get(commandName)

            if (!command) return;

            try {
                await command.run(interaction, client)
                // console.log(interaction)

            } catch (e) {
                console.log(e)
                await interaction.reply({
                    content: 'Něco se posralo\nhttps://cdn.discordapp.com/emojis/1036414607033638983.webp?size=96&quality=lossless',
                    ephemeral: true
                })
            }
        } 
    }
}