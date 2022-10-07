const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const roles = []; //put roles id

module.exports = {
	data: new SlashCommandBuilder()
	.setName('resetallroles')
    .setDescription("Enlever les rôles paramétrés dans la liste (par défaut y'a rien)")
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