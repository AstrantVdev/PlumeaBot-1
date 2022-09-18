const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const roles = ['1019275931245891705', '1020410342842576996', '1020410284667568229'];

module.exports = {
	data: new SlashCommandBuilder()
	.setName('resetseason')
    .setDescription('Enlever les rôles saisonniers')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {

        await roles.forEach(roleid => {
            var role = interaction.guild.roles.cache.get(roleid);

            interaction.guild.members.fetch().then(m => {
                m.forEach(member => {
                    setTimeout(() => {
                        member.roles.remove(role)
                    }, 1000);
                })
            })

        })

        await interaction.reply({ content: 'Action accomplie avec succès ! :D', ephemeral: true });

	},

};