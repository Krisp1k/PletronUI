const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const fetch = require('isomorphic-fetch');

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
        const keywords = interaction.options.getString('hledám')
        const url = `https://tenor.googleapis.com/v2/search?q=${keywords}&key=${process.env.TENORKEY}`

        const fetchData = async (data) => {
            const index = Math.floor(Math.random() * data.results.length);
            const gifUrl = data.results[index].media_formats.gif.url || null;
			// prevent crashing if gifUrl is undefined
			if (!gifUrl || gifUrl === null) {
				await interaction.reply({
					content: 'Něco se pokazilo, zkuste to prosím znovu.',
					ephemeral: true,
				})
				return
			}

            const embed = new EmbedBuilder()
                .setTitle(`'${keywords}' GIF`)
                .setColor(0x18e1ee)
                .setTimestamp(Date.now())
                .setImage(gifUrl)

            await interaction.reply({
                embeds: [embed],
            })
        }

        fetch(url)
            .then((response) => response.json())
            .then((data) => fetchData(data))  
    }  
}