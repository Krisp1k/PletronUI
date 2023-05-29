const { SlashCommandBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Vyhodí člena za porušení pravidel')
        .addUserOption(option =>
            option.setName('člen')
                .setDescription('Člen, kterého chceš vyhodit')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('důvod')
                .setDescription('Důvod, kvůli kterému chceš vyhazovat')
                .setRequired(false)
        ),
    async run(interaction, client) {

        const userToKick = interaction.options.getUser('člen');
        const reason = interaction.options.getString('důvod') || 'Bez udání důvodu';

        console.log(interaction)

        if (userToKick.id == "1110915541469773866") {
            return interaction.reply({ 
                content: 'Nemohu vyhazovat sám sebe přece', 
                ephemeral: true 
            });
        }

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return interaction.reply({ 
                content: 'Bohužel na tohle nemáš práva, to můžou jen admini a těch už moc nemám', 
                ephemeral: true 
            });
        }

        try {

            await interaction.guild.members.kick(userToKick, reason);
            await interaction.reply(`Vyhodil jsem člena **${userToKick.tag}** protože porušil moji autoritu a taky z důvodu: **${reason}**`);

            if (userToKick == interaction.user) {
                await client.users.send(interaction.user.id, "Lmao imagine kickovat sám sebe XD");
            }

        } catch (error) {
            console.log(error);
            await interaction.reply({ 
                content: 'Někde nastala chyba, u mě žádný překvapení.', 
                ephemeral: true 
            });
        }
    },
};