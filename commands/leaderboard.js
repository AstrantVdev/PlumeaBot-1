const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('leaderboard')
    .setDescription("set le leaderboard et son salon")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		const json = require("../utils/json")
		const editJsonFile = require("edit-json-file")

		let memberfile = editJsonFile(CHANNELSPATH);
		const members = memberfile.get("members.list")
        let winnersPlumes = []
        let winnersId = []

        members.forEach(m=>{
            plumes = memberfile.get("members."+m+".plumes")
            higher = true
            const l = winnersPlumes.length
            for (let i = 0; i < l; i++) {

                if(plumes < winnersPlumes[i]){

                    for (let o = l; o > i; o--) {
                        winnersPlumes[o] = winnersPlumes[o-1]
                        winnersId[o] = winnersId[o-1]

                    }
                    winnersPlumes[i] = plumes
                    winnersId[i] = m

                    higher = false
                    break
                }

            }

            if (higher){
                winnersPlumes.push(plumes)
                winnersId.push(m)
            }             

        })

        let message = "\n"
        const l = winnersId.length
        for(i = l-1 ; (i >= l-25 && i >= 0); i--){
            id = winnersId[i]
            intId = json.ABCtoInt(id)
            message+="<@"+intId+"> : " + winnersPlumes[i]+"\n---\n"
        }

        const embed = require('../utils/embed');
        const messageEmbed = embed.new()
        .setTitle("LEADERBOARD :")
        .setDescription(message)
        await interaction.reply({ embeds: [messageEmbed]});

	},

};