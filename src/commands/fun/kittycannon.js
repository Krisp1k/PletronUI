const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const fetch = require('isomorphic-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kittycannon')
		.setDescription('Košišky :3')
		.addNumberOption(option =>
			option.setName('počet')
				.setDescription('Počet zpráv, kolik bude spamovat')
				.setRequired(true)
				.setMinValue(1)
				.setMaxValue(10))
	,
	async run(interaction, client) {

		function delay(ms) {
			return new Promise(resolve => setTimeout(resolve, ms));
		}
		const keywords = [
			"cat",
			"cute cat",
			"kitty",
			"cute kitty",
			"kitty cat",
			"cute kitty cat",
			"absolutely cutest kitty cat",
			"angry cat",
			"cat hiss",
			"kitty hiss"
		]

		const pocet = interaction.options.getNumber('počet');
		const msDelay = 2500; // 1000 = 1s

		async function processCats() {
			for (let i = 0; i < pocet; i++) {
				const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
				const url = `https://tenor.googleapis.com/v2/search?q=${randomKeyword}&key=${process.env.TENORKEY}`

				const fetchData = async (data) => {
					const index = Math.floor(Math.random() * data.results.length);
					const gifUrl = data.results[index].media_formats.gif.url
					const embed = new EmbedBuilder()
						.setTitle(`KOŠIŠKAAAA`)
						.setColor(0x18e1ee)
						.setTimestamp(Date.now())
						.setImage(gifUrl)
					await sendGif(embed)
				}

				const sendGif = async (embed) => {
					try {
						await interaction.channel.send({
							embeds: [embed]
						})
					} catch (err) {
						await interaction.reply({
							content: "Chybka se vloudila",
							ephemeral: true
						})
						await client.log("ERROR", "Error sending kitty gif: " + err.message)
					}
				}

				fetch(url)
					.then((response) => response.json())
					.then((data) => fetchData(data))

				await delay(msDelay)
			}
		}

		await interaction.reply({
			content: "Posílám košišky",
			ephemeral: true
		})
		processCats();
	}
}