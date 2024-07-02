const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('extension')
		.setDescription('?')
	,
	async run(interaction, client) {

		// this command is under maintenance
		return await interaction.reply({
			content:
				"Tento příkaz je momentálně nedostupný, promiň.",
			ephemeral: true,
		});

		const embed = new EmbedBuilder()
			.setTitle(`Skvost Valyrijských IT inženýrů!`)
			.setThumbnail('https://valyrie.krisp1k.eu/wp-content/uploads/2023/08/cropped-bg.webp')
			.setColor(0x18e1ee)
			.setTimestamp(Date.now())
			.setDescription(`
**Valyrie - Pán hradu** je rozšíření do Google Chrome, které vám zjednoduší hraní Pána Hradu pomocí různých nástrojů a hledáčků.

:bulb:  **MOŽNOSTI INSTALACE:**

1. Přímý odkaz na stažení z [Google store](https://chromewebstore.google.com/detail/valyrie-p%C3%A1n-hradu/gcnbfklialdfahdgmgpofnjekopdgekm?hl=cs&pli=1) 
2. Návod na stažení + download link také na [webu Valyrie](https://valyrie.krisp1k.eu/extension/)

:tools:  **FUNKCE:**

- **Seznam hrdinů** - Zobrazí všechny hrdiny a jejich artefakty aktuálně hrající ve Valyrii
- **Hledáček artefaktů** - Pomocí hledáčku můžete vyhledat artefakty po celém serveru, obsahuje i možnost filtrování
- **Raid module** - Vizuální zobrazení magických efektů na jednotce přímo na mapě (nemusíš klikat na jednotku)
- **Teleport Tool** - Jednotně vypočítá časy dopadu portálů našich hráčů na určitý cíl.`);

		await interaction.reply({
			embeds: [embed],
		});
	}
}