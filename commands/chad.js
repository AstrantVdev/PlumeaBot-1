const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('chad')
    .setDescription('chad')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addIntegerOption(option => option
        .setName('giga_chad_power_intensity')
		.setDescription("Giga Chad power intensity")
        .setRequired(true)),

	async execute(interaction) {
        const n = interaction.options.getInteger('giga_chad_power_intensity');
        interaction.reply({ content: 'GIGA CHAD!!!', ephemeral: true });

        for (let i = 0; i < n; i++) {
            interaction.channel.send("https://tenor.com/view/mujikcboro-seriymujik-gif-24361533");
        } 

	},

};