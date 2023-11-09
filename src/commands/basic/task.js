const { SlashCommandBuilder } = require('discord.js')
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('task')
        .setDescription('Zde můžeš zadat úkol někomu jinému')
        .addStringOption(option =>
            option.setName('action')
                .setDescription('Co chceš s úkolem dělat? (Zadat, změnit otroka, smazat úkol)')
                .setRequired(true)
                .addChoices(
                    { name: 'Set', value: 'set' },
                    { name: 'Change', value: 'ch' },
                    { name: 'Delete', value: 'del' },
                ))
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Uživatel, kterému chceš úkol zadat')
                .setRequired(true))
        
    ,
    async run(interaction, client) {

        const msgAuthorId = interaction.user.id
        const action = interaction.options._hoistedOptions[0].value;
        const userId = interaction.options._hoistedOptions[1].value;

    }
}