const editJsonFile = require("edit-json-file")
const dataConfig = editJsonFile(DATA_CONFIG)

module.exports = {
    
    async execute(member, interaction){
        sprinterRole = dataConfig.get("rolesId.sprinter")

        if(member.roles.cache.has(sprinterRole)){
            await member.roles.remove(sprinterRole)
            await interaction.reply({content:"Tu n'es plus un sprinter à présent ! :3\nTu seras donc plus jamais mentionné ! Tous du moins pour les sprints...",ephemeral:true})

        }else{
            await member.roles.add(sprinterRole)
            await interaction.reply({content:"Tu n'es plus un sprinter à présent ! :3\nTu seras donc mentionné à chaque sprint...",ephemeral:true})

        }

    }

}