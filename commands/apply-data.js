const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('apply-data')
    .setDescription("Apply data")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addAttachmentOption(option => option
        .setName('data')
		.setDescription("Fichier CHANNELS.json")
        .setRequired(true)),

	async execute(interaction) {
        const data = interaction.options.getAttachment('data')
        const url = data.url

        const request = require("request");
        const fs = require("fs");
        request.get(url)
            .on('error', console.error)
            .pipe(fs.createWriteStream('CHANNELS.json'));

		await interaction.reply({ content: 'Action accomplie avec succès ! :D', ephemeral: true })

	},

};