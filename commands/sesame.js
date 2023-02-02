const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('sesame')
    .setDescription("Permet d'accéder au serveur uwu")
    .addStringOption(option => option
        .setName('pass')
		.setDescription("Mot de passe dans la description du salon")
        .setRequired(true)),

	async execute(interaction) {
        const n = interaction.options.getString('pass')
        interaction.reply({ content: 'Bienvenue uwu', ephemeral: true })
    
    

	}

}
