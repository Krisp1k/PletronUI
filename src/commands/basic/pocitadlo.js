const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pocitadlo')
        .setDescription('Spočítá čas, kdy se rozpadne artefakt podle aktuálních procent')
        .addNumberOption(option =>
            option.setName('procenta')
                .setDescription('Aktuální procenta artefaktu (0-100)')
                .setRequired(true)
                .setMinValue(0)
                .setMaxValue(100)
        ),
    async run(interaction, client) {

        const vypocetCasu = (currentPercentage) => {
            const currentTime = new Date();
            const currentHours = currentTime.getHours();
            const currentMinutes = currentTime.getMinutes();

            // Výpočet času dosažení 0%
            const remainingPercentage = currentPercentage;
            const remainingDamageCycles = Math.floor(remainingPercentage / 3) + 1;
            const remainingHours = remainingDamageCycles * 8;

            let breakdownTime = new Date();
            breakdownTime.setHours(currentHours);
            breakdownTime.setMinutes(currentMinutes);

            if (currentHours < 8) 
            {
                breakdownTime.setHours(8);
                breakdownTime.setMinutes(0);
            } 
            else if (currentHours < 16) 
            {
                breakdownTime.setHours(16);
                breakdownTime.setMinutes(0);
            } 
            else 
            {
                breakdownTime.setHours(24);
                breakdownTime.setMinutes(0);
                breakdownTime.setDate(breakdownTime.getDate() + 1);
            }

            let remainingDays = Math.floor(remainingHours / 24);
            let remainingHoursInDay = remainingHours % 24;

            while (remainingDays > 0) {
                breakdownTime.setDate(breakdownTime.getDate() + 1);
                if (breakdownTime.getDay() !== 0 && breakdownTime.getDay() !== 6) {
                    remainingDays--;
                }
            }

            breakdownTime.setHours(breakdownTime.getHours() + remainingHoursInDay);

            let completeBreakdownTime = new Date(breakdownTime);

            completeBreakdownTime.setDate(breakdownTime.getDate() + 1);
            completeBreakdownTime.setHours(5);
            completeBreakdownTime.setMinutes(5);

            if (completeBreakdownTime <= breakdownTime) {
                completeBreakdownTime.setDate(completeBreakdownTime.getDate() + 1);
            }

            return {
                breakdownTime,
                completeBreakdownTime
            };
        }

        const currPercentage = interaction.options.getNumber("procenta")
        const casyRozpadu = vypocetCasu(currPercentage);

        const options = { 
            day: 'numeric', 
            month: 'numeric', 
            year: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
        };

        await interaction.reply({
            content: `Artefakt (${currPercentage}%) dosáhne 0% v čase **${casyRozpadu.breakdownTime.toLocaleString('cs-CZ', options)}**.\n*(Kompletně se rozpadne v 5:05 hodin dalšího dne ráno.)*`,
            ephemeral: false
        })
    }
}