const { SlashCommandBuilder } = require('discord.js')
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gif')
        .setDescription('Vyhledá a pošle gif uwu')
        .addStringOption(option =>
            option.setName('hledám')
                .setDescription('Jaký gif chceš vyhledat?')
                .setRequired(true)
                .setMaxLength(100))
    ,
    async run(interaction, client) {
        console.log(interaction.options)
    }
}