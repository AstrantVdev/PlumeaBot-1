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
        const user = interaction.options.getUser('user');
        const data = editJsonFile(DATA);
        members = data.get("members.list")

        if(!members.includes(id)&& !user.bot){
            const data = require("../utils/data")
            data.accountCreate(user)
        }

        interaction.reply({ephemeral:true,content:"https://tenor.com/view/mujikcboro-seriymujik-gif-24361533"});

	},

};