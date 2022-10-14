const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('set_channel')
    .setDescription("Changer l'ID d'un channel")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)  
    .addStringOption(option =>
		option.setName('channel')
			.setDescription("Channel à changer")
			.setRequired(true)
			.addChoices(
				{ name: 'Text', value: 'text' },
				{ name: 'Log', value: 'log' },
			))
    .addStringOption(option => option
        .setName('id')
		    .setDescription("Passer en mod développeur et faire clic droit sur le channel pour get l'ID")
			.setMinLength(19)
			.setMaxLength(19)
		    .setRequired(true)),
	async execute(interaction) {
		let channel = interaction.options.getString('channel');
		let id = interaction.options.getString('id');

	},
};