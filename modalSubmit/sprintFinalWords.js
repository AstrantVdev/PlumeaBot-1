module.exports = {
    
    async execute(member, interaction){
        const sprint = require("../utils/sprint.js")

        let words = interaction.fields.getTextInputValue("words")     
        try {
            if(sprint.isSprinter(member.user.id)){
                words = parseInt(words)
                sprint.updateFinishMessage(member.user.id, words)
                interaction.reply({content:"**Te voilà inscrit dans le marbre mon cher ; )**",ephemeral:true})

            }else{
                interaction.reply({content:"**Tu faisais pas parti du sprint toi...**",ephemeral:true})
            }
        } catch (error) {
            console.log(error)
            interaction.reply({content:"**C'est pas nombre ca ! :D**",ephemeral:true})
        }

    }

}