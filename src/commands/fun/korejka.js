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
            "newjeans danielle dancing",
            "newjeans danielle tiktok",
            "newjeans danielle tiktok dance",
            "newjeans danielle tiktok dancing",
            "blackpink",
            "blackpink lisa",
            "blackpink jennie",
            "blackpink rose",
            "blackpink jisoo",
            "blackpink lisa dance",
            "blackpink jennie dance",
            "blackpink rose dance",
            "blackpink jisoo dance",
            "korean girl",
            "kpop dance",
            "kpop idol",
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

            console.log("Korejka na přání... ", gifUrl);
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
                console.log("Chyba u načítání korejky ", err);
            }
        };
    },
};
