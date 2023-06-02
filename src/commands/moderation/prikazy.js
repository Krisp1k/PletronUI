const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('prikazy')
        .setDescription('Zobrazí všechny dostupné příkazy')
    ,
    async run(interaction, client) {
        
        let finalString = "**__SEZNAM VŠECH DOSTUPNÝCH PŘÍKAZŮ__**\n\n";

        client.commandArray.forEach(
            command => finalString += `/**${command.name}** - ${command.description}\n`
        )

        await interaction.reply({
            content: finalString,
            ephemeral: false
        }) 
    }
}