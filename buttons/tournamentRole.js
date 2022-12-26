const editJsonFile = require("edit-json-file")
const dadataConfig = editJsonFile("DATA_CONFIG.json")

module.exports = {
    
    async execute(member, interaction){
        tournamentRole = dataConfig.get("rolesId.tournament")

        if(member.roles.cache.has(tournamentRole)){
            await member.roles.remove(tournamentRole)
            await interaction.reply({content:"Okay... ;-;",ephemeral:true})

        }else{
            await member.roles.add(tournamentRole)
            await interaction.reply({content:

                `Vous avez désormais accès aux salons 
                <@#${dadataConfig.get("channels.tournamentRules")}> 
                et <@#${dadataConfig.get("channels.monthlyNovel")}>`

                ,ephemeral:true})

        }

    }

}
