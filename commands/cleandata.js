const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
	.setName("cleandata")
    .setDescription("w")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), 

	async execute(interaction) {
        const editJsonFile = require("edit-json-file")
        const data = editJsonFile(DATA)
        const members = data.get("members.list")
        const correctMembers = []

        await members.forEach(async m => {
            
            try {
                const date = await data.get("members."+m+".date")
                await correctMembers.add(m)
                console.log(m)
                
            } catch (error) {
                
            }
            
        })
        console.log("DONE")

        await data.set("members.list", correctMembers)
        await data.save()

        interaction.reply({content:"ez",ephemeral:true})

	}

}
