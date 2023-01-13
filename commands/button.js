const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js')
const editJsonFile = require("edit-json-file")
const dataConfig = editJsonFile(DATA_CONFIG)

module.exports = {
	data: new SlashCommandBuilder()
	.setName("button")
    .setDescription("Create a button")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
	.addStringOption(option =>
		option.setName("name")
			.setDescription("Button's name")
			.addChoices(
				{ name: "tournamentRole", value: "1" })
            .setRequired(true)), 

	async execute(interaction) {
        const value = interaction.options.getString("name")

        switch(value){
            case "1":
                await interaction.channel.send({content : `Appuyez sur le bouton pour participer au <@&${await dataConfig.get("rolesId.tournament")}> :`
                , components: [await this.tournamentRole()]})
        }
        
		await interaction.reply({ content: "Action accomplie avec succès ! :D", ephemeral: true })

	},

    tournamentRole(){
        const sprintRole = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("tournamentRole")
                .setEmoji("<:Plumea:1062260412600557598>")
                .setStyle(ButtonStyle.Danger)
        )

        return sprintRole
    },

}
