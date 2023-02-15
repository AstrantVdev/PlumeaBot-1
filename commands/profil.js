const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('profil')
    .setDescription("Profil d'un Pluméen")
	.addUserOption(option => option
        .setName('user')
		.setDescription("Pluméen")
        .setRequired(true)),
	async execute(interaction) {
		const json = require("../utils/json")
		const editJsonFile = require("edit-json-file")

		let data = editJsonFile(DATA);
		const user = interaction.options.getUser('user')
		const id = json.intToABC(user.id)
		const plumes = data.get("members."+id+".plumes")
		const date = data.get("members."+id+".date")
		const credits = data.get("members."+id+".scriptucoins")

		message = "**Profil de : <@"+user.id+">**\n\n"
		message += "Plumes : *"+plumes+"*\n"
		message += "Arrivée : *"+date+"*\n"
		message += "Crédits Pluméens : *"+credits+"*\n"

		const messageUtil = require('../utils/message');
        const messageEmbed = messageUtil.newEmbed()
        .setDescription(message)
        await interaction.reply({ embeds: [messageEmbed]});

	},

};