const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('emote')
    .setDescription('plume'),
	async execute(interaction) {
        await interaction.channel.send("<:plume:1024014166022955078>")

	},

};