const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('profil')
    .setDescription("Profil d'un scripturien")
	.addUserOption(option => option
        .setName('user')
		.setDescription("Scripturien")
        .setRequired(true)),
	async execute(interaction) {
		const json = require("../utils/json")
		const editJsonFile = require("edit-json-file")

		let memberfile = editJsonFile(MEMBERSPATH);
		const user = interaction.options.getUser('user')
		const name = user.username
		const id = json.intToABC(user.id)
		const plumes = memberfile.get(id+".plumes")
		const date = memberfile.get(id+".date")
		const scriptucoins = memberfile.get(id+".scriptucoins")

		message = "**Profil de : <@"+user.id+">**\n\n"
		message += "Plumes : *"+plumes+"*\n"
		message += "Arrivée : *"+date+"*\n"
		message += "Scriptucoins : *"+scriptucoins+"*\n"

		const embed = require('../utils/embed');
        const messageEmbed = embed.new()
        .setDescription(message)
        await interaction.reply({ embeds: [messageEmbed]});

	},

};