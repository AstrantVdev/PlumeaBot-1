const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('emote')
    .setDescription('plume'),
	async execute(interaction) {
		const editJsonFile = require("edit-json-file")
        const dataConfig = editJsonFile(DATA_CONFIG)

        await interaction.channel.send(dataConfig.get("emotes.plume"))

	}

}