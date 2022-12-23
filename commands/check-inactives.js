const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
	.setName("check-inactives")
    .setDescription("Renvoie une liste des membres sans point et présents depuis au moins un mois")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const editJsonFile = require("edit-json-file")
        let message = "\n"

        const today = new Date()
        today.setDate(today.getDate() - 30);
        const date = ("0" + today.getDate()).slice(-2);
        const month = ("0" + (today.getMonth() + 1)).slice(-2);
        const year = today.getFullYear();
        const todayInt = parseInt(year+month+date)

        const membersfile = editJsonFile(DATA);
        const members = membersfile.get("members.list")
        let n = 0
        let index = 1

        members.forEach(async id=>{
            const json = require("../utils/json.js")
            const plumes = membersfile.get("members."+id+".plumes")
            const date = membersfile.get("members."+id+".date")
            const dateInt = parseInt(date)

            let messageNumber = 1

            if(plumes <= 0 && dateInt <= todayInt){
                id = json.ABCtoInt(id)
                message += ("<@"+id+">   Plumes : **"+plumes+"** - Arrivée : **"+date+"**\n")
                n++

                if(n > messageNumber*32 || index == members.length){

                    const messageUtil = require("../utils/message");
                    const messageEmbed = messageUtil.newEmbed()
                    .setTitle("__**Liste des membres sans point et présents depuis au moins un mois : **__" + n)
                    .setDescription(message)

                    if(messageNumber == 1){
                        await interaction.reply({ embeds: [messageEmbed]})

                    }else{
                        await interaction.channel.send({ embeds: [messageEmbed]})
                    }

                    messageNumber++
                    
                }

            }

            index++

        })
    
    }

}
