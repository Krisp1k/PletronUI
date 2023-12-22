const { InteractionType, EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {

        if (!interaction) return;

        if (interaction.isChatInputCommand()) {
            const { commands } = client
            const { commandName } = interaction
            const command = commands.get(commandName)

            if (!command) return;

            try {
                await command.run(interaction, client)
                console.log("[COMMAND] (NAME: '" + interaction.commandName + "' , USER: !" + interaction.member.user.username,"' , OPTIONS: ", interaction.options._hoistedOptions)
                
                // console.log(interaction)  

            } catch (e) {
                console.log(e)
                const embed = new EmbedBuilder()
                    .setTitle(`něco se posralo`)
                    .setColor(0x18e1ee)
                    .setTimestamp(Date.now())
                    .setImage('https://cdn.discordapp.com/emojis/1036414607033638983.webp?size=96&quality=lossless')

                await interaction.reply({
                    embeds: [embed],
                    ephemeral:true
                })
            }
        } 
    }
}