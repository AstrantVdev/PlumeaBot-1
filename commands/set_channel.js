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
		const fileName = CHANNELSPATH;
		const file = require(fileName);

		switch(channel){
			case "text":
				file.text = id;
			break;
			case "log":
				file.log = id;
			break;
		}
			
		await fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
		  if (err) return console.log(err);
		  console.log(JSON.stringify(file, null, 2));
		  console.log('writing to ' + fileName);
		});

		await interaction.reply({ content: 'Action accomplie avec succès ! :D', ephemeral: true });

	},
};