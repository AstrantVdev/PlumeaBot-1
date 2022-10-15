const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('account-create')
    .setDescription("Crée un compte /!\\ ECRASE TOUTES LES DONNEES DE L'UTILISATEUR !!!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption(option => option
        .setName('user')
		.setDescription("user")
        .setRequired(true)),

	async execute(interaction) {
        const dataUtils = require("../utils/data")
        await dataUtils.accountCreate(user)

        await interaction.reply({ephemeral:true,content:"https://tenor.com/view/mujikcboro-seriymujik-gif-24361533"});

	}

}