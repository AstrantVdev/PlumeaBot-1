const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('emote')
    .setDescription('plume'),
	async execute(interaction) {
		const editJsonFile = require("edit-json-file")

		var string = '548551538487066629';
		const json = require("../utils/json.js")
		console.log(json.intToABC(string))

		let TEST = editJsonFile(TEXTSPATH);
		te = TEST.get("genres.nouvelle")
		te.forEach(element => console.log(element))
		console.log(te)

        await interaction.channel.send("<:plume:1024014166022955078>")
        await interaction.reply({content:"ez", ephemeral:true})

	},

};