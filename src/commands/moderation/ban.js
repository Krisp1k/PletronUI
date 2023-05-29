const { SlashCommandBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('ZaBANuje člena za porušení pravidel')
        .addUserOption(option =>
            option.setName('člen')
                .setDescription('Člen, kterého chceš zabanovat')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('důvod')
                .setDescription('Důvod, kvůli kterému chceš banovat')
                .setRequired(false)
        ),
    async run(interaction, client) {

        const userToBan = interaction.options.getUser('člen');
        const reason = interaction.options.getString('důvod') || 'Bez udání důvodu';

        if (userToBan.id == "1110915541469773866") {
            return interaction.reply({ 
                content: 'Nemohu banovat sám sebe přece', 
                ephemeral: true 
            });
        }

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return interaction.reply({ 
                content: 'Bohužel na tohle nemáš práva, to můžou jen admini a těch už moc nemám', 
                ephemeral: true 
            });
        }

        try {
            await interaction.guild.members.ban(userToBan, { reason });
            await interaction.reply(`Zabanoval jsem **${userToBan.tag}** protože porušoval moje pravidla a taky z důvodu: **${reason}**`);

            if (userToBan == interaction.user) {
                await client.users.send(interaction.user.id, "Lmao imagine banovat sám sebe XD");
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