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
        const url = `https://g.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORKEY}`

        const fetchData = async (data) => {

            const index = Math.floor(Math.random() * data.results.length);
            const gifUrl = data.results[index].media[0].gif.url

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