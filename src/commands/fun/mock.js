const { SlashCommandBuilder } = require('discord.js')
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mock')
        .setDescription('Můžeš potají nastavit, aby UIIIIII napodobovala (nebo přestala napodobovat) jiného hráče')
        .addStringOption(option =>
            option.setName('start-stop')
                .setDescription('Zda chceš, aby bot začal napodobovat, nebo přestal')
                .setRequired(true)
                .addChoices(
                    { name: 'Start', value: 'start' },
                    { name: 'Stop', value: 'stop' },
                ))
        .addUserOption(option =>
            option.setName('uživatel')
                .setDescription('Uživatel, u kterého chceš provést akci')
                .setRequired(true))
    ,
    async run(interaction, client) {

        const writeToFile = (value) => {
            fs.writeFile('src/data/mock.txt', value, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        };

        const readFirstRow = (filePath) => {
            return new Promise((resolve, reject) => {
                fs.readFile(filePath, 'utf8', (error, data) => {
                    if (error) {
                        reject(error); return;
                    }

                    const rows = data.trim().split('\n');
                    const firstRow = rows[0];
                    resolve(firstRow);
                });
            });
        };

        const msgAuthorId = interaction.user.id
        const action = interaction.options._hoistedOptions[0].value;
        const userId = interaction.options._hoistedOptions[1].value;

        const firstRow = await readFirstRow('src/data/mock.txt');

        // člověk se nemůže sám odmocknout
        if (msgAuthorId == userId) {
            await interaction.reply({
                content: `Nemůžeš používat tento command, pokud na sobě máš mock ;)`,
                ephemeral: true,
            });
            return;
        }

        if (userId == "1110915541469773866") {
            await interaction.reply({
                content: `To jsem já, to nemůžu`,
                ephemeral: true,
            });
            return;
        }

        if (userId == "861583144289042472") {
            await interaction.reply({
                content: `Nemůžu tenhle command použít na ZIU, zeptejte se saeho proč.`,
                ephemeral: true,
            });
            return;
        }

        switch (action) {
            case 'start':
                writeToFile(userId);
                await interaction.reply({
                    content: `Budu napodobovat toho šaška <@${userId}>`,
                    ephemeral: true,
                });
                break;

            case 'stop':
                let mockCancelled = false;

                if (firstRow === userId) {
                    console.log('ruším mock');
                    writeToFile('none');
                    mockCancelled = true;
                }

                if (mockCancelled) {
                    await interaction.reply({
                        content: `Přestanu napodobovat tohohle šaška <@${userId}>`,
                        ephemeral: true,
                    });
                } else {
                    await interaction.reply({
                        content: 'Ale však tohohle nenapodobuju, zajdi si k doktoroj a z peněž co zbydou kup kredity, potřebuju na dovolenou.',
                        ephemeral: true,
                    });
                }

                break;
        }
    }
}