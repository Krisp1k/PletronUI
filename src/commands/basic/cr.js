const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const puppeteer = require('puppeteer');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cr')
        .setDescription('Ukáže pozice a artefakty černých rytířů na daném serveru')
        .addNumberOption(option =>
            option.setName('server')
                .setDescription('Číslo serveru, který chcete prohledat')
                .setRequired(true)
                .setMaxValue(7)
                .setMinValue(3))
    ,
    async run(interaction, client) {

        let finalString = "";

        const serverId = interaction.options.getNumber("server");

        if (serverId != 3 && serverId != 4 && serverId != 5 && serverId != 6 && serverId != 7) {
            // const embed = new EmbedBuilder()
            //     .setTitle(`Pozice černých rytířů na serveru ${serverId}`)
            //     .setColor(0x18e1ee)
            //     .setTimestamp(Date.now())
            //     .setDescription("Pro tento server nebyli nalezeni žádní rytíři.")

            // await interaction.reply({
            //     embeds: [embed],
            // })

            finalString = `Pro server ${serverId} nebyli nalezeni žádní ČR.`
            await interaction.reply(finalString)

            return;
        }

        const url = 'https://www.panhradu.cz/units_serialize.aspx?id_server=' + serverId

        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()
        await page.goto(url)
        const pageContent = await page.content()
        await page.close()
        await browser.close()
        const newContent = pageContent.replace(/&gt/g, "")

        const crArr = []
        const chunks = [];

        const makeArray = (contentLine) => {
            contentPiece = contentLine.split(";")
            crArtefakt = parseInt(contentPiece[3])

            // 49 plášť, 50 helma, 51 meč, 52 zbroj, 53 amulet, 54 štít, 55 kuš, 56 boty

            switch (crArtefakt) {
                case 49: crArtefakt = "**:shirt: Plášť temnoty**"; break;
                case 50: crArtefakt = "**:military_helmet: Helma nazgůla**"; break;
                case 51: crArtefakt = "**:dagger: Ohnivý meč**"; break;
                case 52: crArtefakt = "**:kimono: Černá zbroj**"; break;
                case 53: crArtefakt = "**:ring: Amulet života**"; break;
                case 54: crArtefakt = "**:shield: Štít smrtihlav**"; break;
                case 55: crArtefakt = "**:bow_and_arrow: Černá kuš**"; break;
                case 56: crArtefakt = "**:jeans: Černé holenice**"; break;
                default: crArtefakt = ":no_entry_sign: Žádný artefakt"; break;
            }

            if (contentPiece[2] === "10") {
                // const crInfo = {
                //     x_cord: contentPiece[0],
                //     y_cord: contentPiece[1],
                //     art: crArtefakt,
                // }
                //crArr.push(crInfo)
                
                const tempString = `${crArtefakt} - [[${contentPiece[0]},${contentPiece[1]}]](https://panhradu.cz/main.aspx?x=${contentPiece[0]}&y=${contentPiece[1]})\n`
                const finalStringLen = finalString.length
                const tempStringLen = tempString.length

                if (finalStringLen + tempStringLen >= 2000) {
                    chunks.push(finalString);
                    finalString = tempString;
                } else {
                    finalString += tempString;
                }
            }
        }

        newContent.split("\n").forEach(contentLine => makeArray(contentLine))

        // const embed = new EmbedBuilder()
        //     .setTitle(`Pozice černých rytířů na serveru ${serverId}`)
        //     .setColor(0x18e1ee)
        //     .setTimestamp(Date.now())

        // for (let i = 0; i < crArr.length; i++) {

        //     const cr = crArr[i];

        //     if (embed.fields && embed.fields.length >= 25) {
        //         await interaction.reply({
        //             embeds: [embed],
        //         })

        //         const newEmbed = new EmbedBuilder()
        //             .setTitle(`Pozice černých rytířů na serveru ${serverId}`)
        //             .setColor(0x18e1ee)
        //             .setTimestamp(Date.now())

        //         for (let j = i; j < crArr.length; j++) {
        //             newEmbed.addFields({ name: cr.art, value: `*[Odkaz na mapu](https://panhradu.cz/main.aspx?x=${cr.x_cord}&y=${cr.y_cord})*`, inline: true })
        //         }

        //         await interaction.followUp({
        //             embeds: [newEmbed],
        //         })

        //         break;
        //     }

        //     embed.addFields({ name: cr.art, value: `*[Odkaz na mapu](https://panhradu.cz/main.aspx?x=${cr.x_cord}&y=${cr.y_cord})*`, inline: true })
        // }

        try {
            chunks.push(finalString);
            if (chunks.length > 0) {
                console.log(chunks)

                await interaction.reply({ 
                    content: chunks[0], 
                    ephemeral: false 
                })

                for (let i = 1; i < chunks.length; i++) {
                    await interaction.followUp({ 
                        content: chunks[i], 
                        ephemeral: false 
                    }); 
                }
            }
        } catch(e){
            console.log(e)
            await interaction.reply("Problém s připojením")
        }
        
    }
}