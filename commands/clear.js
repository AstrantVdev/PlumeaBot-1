const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('clear')
    .setDescription('Atomise tout les messages du salon')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addIntegerOption(option => option
        .setMinValue(1)
        .setMaxValue(99)
        .setName('clear_intensity')
		.setDescription("Nombre de messages à effacer")
        .setRequired(true)),

	async execute(interaction) {
        let n = interaction.options.getInteger('clear_intensity');
        let channel = interaction.channel;
        
        await channel.messages.fetch({limit: n})
        .then(messages => channel.bulkDelete(messages));
		
        await interaction.reply({ content: 'Action accomplie avec succès ! :D', ephemeral: true });

	},

};