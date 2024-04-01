const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = require("isomorphic-fetch");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("korejka")
		.setDescription("Na přání Nema a Aldy"),

	async run(interaction, client) {
		const keywords = [
			"newjeans",
			"newjeans danielle",
			"newjeans danielle dance",
			"blackpink",
			"blackpink lisa",
			"blackpink jennie",
			"blackpink rose",
			"blackpink jisoo",
			"korean girl",
			"kpop dance",
			"kpop idol",
			"kim jong un", // xd
			"blackpink rose lovesick",
			"alice in borderland girl",
			"glory kdrama",
			"Kim Yoo-jung",
			"itzy",
			"my demon",
			"bloodhounds",
		];

		const randomKeyword =
			keywords[Math.floor(Math.random() * keywords.length)];

		const url = `https://tenor.googleapis.com/v2/search?q=${randomKeyword}&key=${process.env.TENORKEY}`;

		fetch(url)
			.then((response) => response.json())
			.then((data) => fetchData(data));

		const fetchData = async (data) => {
			const index = Math.floor(Math.random() * data.results.length);

			const gifUrl = data.results[index].media_formats.gif.url;

			const embed = new EmbedBuilder()
				.setTitle(`Korejka na přání`)
				.setColor(0x18e1ee)
				.setTimestamp(Date.now())
				.setImage(gifUrl);
			await sendGif(embed);
		};

		const sendGif = async (embed) => {
			try {
				await interaction.reply({
					embeds: [embed],
				});
			} catch (err) {
				await interaction.reply({
					content: "Chybka se vloudila",
					ephemeral: true,
				});
				await client.log("ERROR", "Error sending korejka gif: " + err.message);
			}
		};
	},
};
