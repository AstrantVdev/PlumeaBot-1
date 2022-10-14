const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const leaderboard = require('../utils/leaderboard');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('leaderboard')
    .setDescription("set le leaderboard et son salon")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
        const leaderboard = require("../utils/leaderboard")
        const message = await leaderboard.create()

        await interaction.reply({ embeds: [message]});

	},

};