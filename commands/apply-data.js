const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('apply-data')
    .setDescription("Apply data")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addAttachmentOption(option => option
        .setName('data')
		.setDescription("Fichier DATA.json")
        .setRequired(true)),

	async execute(interaction) {
        const data = interaction.options.getAttachment('data')
        const url = data.url
        const dataUtil = require("../utils/data.js")

        let request = require("request");
        let fs = require("fs");
        await request.get(url)
            .on('error', console.error)
            .pipe(fs.createWriteStream(DATA))

        function upload(){
            dataUtil.upload()
        }
        await setTimeout(upload, 4*1000, "Data !") //timout to wait file writing
        
		await interaction.reply({ content: 'Action accomplie avec succès ! :D', ephemeral: true })

	},

};