const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Zobrazí všechny dostupné příkazy')
    ,
    async run(interaction, client) {
        
        await interaction.reply({
            content: "Na tomhle commandu se ještě pracuje, nebo jednoduše, vytvořil jsem ho a vysral se na něj.",
            ephemeral: false
        }) 

    }
}