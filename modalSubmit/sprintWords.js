module.exports = {
    
    async execute(member, interaction){
        const sprint = require("../utils/sprint.js")

        let words = interaction.fields.getTextInputValue("words")     
        try {
            if(!sprint.isSprinter(member.user.id)){
                words = parseInt(words)
                sprint.addSprinter(member.user.id, words)
                interaction.reply({content:"**Youpiii ! :D**",ephemeral:true})
            }else{
                interaction.reply({content:"**Tu en fais déjà parti ! Trop tard ;-;**",ephemeral:true})
            }
        } catch (error) {
            interaction.reply({content:"**C'est pas nombre ca ! :D**",ephemeral:true})
        }
    }

}