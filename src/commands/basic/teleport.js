const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuOptionBuilder } = require('discord.js')
const puppeteer = require('puppeteer');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('teleport')
        .setDescription('Vypočítá dobu letu mezi souřadnicemi')
        .addNumberOption(xStart =>
            xStart.setName('x_start')
                .setDescription('Počáteční souřadnice X')
                .setRequired(true)
            )
        .addNumberOption(yStart =>
            yStart.setName('y_start')
                .setDescription('Počáteční souřadnice Y')
                .setRequired(true)
            )
        .addNumberOption(xEnd =>
            xEnd.setName('x_end')
                .setDescription('Konečná souřadnice X')
                .setRequired(true)
            )
        .addNumberOption(yEnd =>
            yEnd.setName('y_end')
                .setDescription('Konečná souřadnice Y')
                .setRequired(true)
            )
        .addStringOption(server =>
            server.setName('rychlost_serveru')
                .setDescription('Rychlost serveru')
                .setRequired(true)
                .addChoices(
                    { name: 'pomalý', value: 'slow', description: "Servery S3, S4" },
                    { name: 'rychlý', value: 'fast', description: "Servery S5, S46, S7" },
                )
            )
    ,
    async run(interaction, client) {

        // write a function to calculate the distance between two points, and then calculate the flight time
        const xStart = interaction.options.getNumber('x_start');
        const yStart = interaction.options.getNumber('y_start');
        const xEnd = interaction.options.getNumber('x_end');
        const yEnd = interaction.options.getNumber('y_end');
        const server = interaction.options.getString('rychlost_serveru');

        // these are the values for the flight time calculation. if the server is fast, the values are different
        const FastServerBaseTime = 60
        const FastServerMinutesPerField = 2.5
        const SlowServerBaseTime = 120
        const SlowServerMinutesPerField = 5

        const currentTime = new Date();

        const distance = Math.sqrt(Math.pow(xStart - xEnd, 2) + Math.pow(yStart - yEnd, 2))

        let flightTime = 0;

        if (server === 'fast') {
            flightTime = FastServerBaseTime + (distance * FastServerMinutesPerField)
        } else if (server === 'slow') {
            flightTime = SlowServerBaseTime + (distance * SlowServerMinutesPerField)
        }

        const arrivalTime = new Date(currentTime.getTime() + flightTime * 60000);

        const embed = new EmbedBuilder()
            .setTitle(`Doba letu`)
            .setColor(0x18e1ee)
            .setTimestamp(Date.now())
            .setDescription(`
                **Počáteční souřadnice:** [${xStart},${yStart}]
                **Konečné souřadnice:** [${xEnd},${yEnd}]
                **Vzdálenost:** ${distance.toFixed(2)} políček
                **Čas letu:** ${flightTime.toFixed(2)} minut\n
                --------------------------------------------
                **Přílet:** ${arrivalTime.toLocaleTimeString()}
                --------------------------------------------`
            )

        await interaction.reply({
            embeds: [embed],
        })


    }
}