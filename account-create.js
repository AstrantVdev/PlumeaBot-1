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
        const editJsonFile = require("edit-json-file")

        const json = require("../utils/json.js")
        const id = json.intToABC(user.id)
        const membersfile = editJsonFile(CHANNELSPATH);

        members = membersfile.get("members.list")
        const today = new Date()
        const date = ("0" + today.getDate()).slice(-2);
        const month = ("0" + (today.getMonth() + 1)).slice(-2);
        const year = today.getFullYear();
        members.push(id)

        await membersfile.set("members.list", members)
        await membersfile.set("members." + id +".date", year+month+date)
        await membersfile.set("members." + id+".plumes", 0)
        await membersfile.set("members." + id+".scriptucoins", 0)
        await membersfile.save()

        interaction.reply({ephemeral:true,content:"https://tenor.com/view/mujikcboro-seriymujik-gif-24361533"});

	},

};