const { SlashCommandBuilder } = require('discord.js')
const fs = require('fs');
const puppeteer = require('puppeteer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('klan')
    .setDescription('Pouze tobě zobrazí seznam členů v klanu')
    .addStringOption(option =>
      option.setName('název')
        .setDescription('Název klanu přesně tak, jak ho lze nalézt ve hře')
        .setRequired(true)
        .setMaxLength(512)),

  async run(interaction, client) {

    const filePath = "src/data/klany.txt";

    const fileData = await new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        resolve(data.split("\n"));
      });
    });

    const klanyS3 = fileData[0];
    const klanyS4 = fileData[1];
    const klanyS5 = fileData[2];
    const klanyS6 = fileData[3];

    let vyhledavanyKlan = interaction.options.getString("název");
    let serverKlanu = 0;
    let finalString = "";

    if (klanyS3.includes(vyhledavanyKlan.toLowerCase())) {
      serverKlanu = 3;
    } else if (klanyS4.includes(vyhledavanyKlan.toLowerCase())) {
      serverKlanu = 4;
    } else if (klanyS5.includes(vyhledavanyKlan.toLowerCase())) {
      serverKlanu = 5;
    } else if (klanyS6.includes(vyhledavanyKlan.toLowerCase())) {
      serverKlanu = 6;
    } else {
      serverKlanu = 7;
    }

    const url = 'https://www.panhradu.cz/globe_serialize.aspx?id_server=' + serverKlanu;

    const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.goto(url);
    const pageContent = await page.content();
    await page.close();
    await browser.close();
    const newContent = pageContent.replace(/&gt/g, "");

    ///console.log(newContent.split("\n"));

    const chunks = [];

    const findClan = (contentLine) => {
      const contentPiece = contentLine.split(";")
      const x = contentPiece[0];
      const y = contentPiece[1];
      const mapType = contentPiece[2];
      const klan = contentPiece[7];
      const hrac = contentPiece[5];

      if (mapType != "k1") {
        return;
      }

      if (klan && klan.toLowerCase() == vyhledavanyKlan.toLowerCase()) {
        const tempString = `**:bust_in_silhouette: ${hrac}** - [[${x},${y}]](https://panhradu.cz/main.aspx?x=${x}&y=${y})\n`
        const finalStringLen = finalString.length
        const tempStringLen = tempString.length - 15

        if (finalStringLen + tempStringLen >= 2000) {
          chunks.push(finalString);
          finalString = tempString;
        } else {
          finalString += tempString;
        }
      }
    }

    newContent.split("\n").forEach(contentLine => findClan(contentLine))

    try {
      chunks.push(finalString);

      if (finalString == null || finalString == "") {
        await interaction.reply({ content: "Tento klan nebyl nalezen\nhttps://cdn.discordapp.com/emojis/1036414607033638983.webp?size=96&quality=lossless", ephemeral: true });
        return
      }

      await interaction.reply({ content: chunks[0], ephemeral: true })

      for (let i = 1; i < chunks.length; i++) {
        await interaction.followUp({ content: chunks[i], ephemeral: true });
      }

    } catch (e) {
      console.log(e)
      await interaction.reply("Problém s připojením")
    }
  }
}
