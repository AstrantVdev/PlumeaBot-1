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

        await members.forEach(m => {
            
            try {
                let date = 1
                date += data.get("members."+m+".plumes")
                if(date >=0){
                    correctMembers.push(m)
                    console.log(m)
                }
                
            } catch (error) {
                console.log(error)
                
            }
            
        })
        console.log("DONE")

        console.log(correctMembers)
        await data.set("members.list", correctMembers)
        await data.save()

        interaction.reply({content:"ez",ephemeral:true})

	}

}
