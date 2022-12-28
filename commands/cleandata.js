const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const editJsonFile = require("edit-json-file")
const data = editJsonFile(DATA)

module.exports = {
	data: new SlashCommandBuilder()
	.setName("cleandata")
    .setDescription("w")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), 

	async execute(interaction) {
        const members = data.get("members.list")
        const correctMembers = []

        await members.forEach(m => {
            
            try {
                const date = data.get("members."+m+".date")
                correctMembers.add(m)
                
            } catch (error) {
                
            }
            
        })

        await data.set("members.list", correctMembers)
        await data.save()

        interaction.reply({content:"ez",ephemeral:true})

	}

}
