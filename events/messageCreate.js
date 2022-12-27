module.exports = {
	name: 'messageCreate',
	async execute(message) {
        const editJsonFile = require("edit-json-file")
        const dataUtils = require("../utils/data.js")
        const messageUtils = require("../utils/message")
        const dataConfig = editJsonFile("DATA_COG.json")
        const data = editJsonFile(DATA)
        const channelName = message.channel.name
        const channelId = message.channel.id
        userId = message.author.id

        if (!message.author.bot){
			    console.log(data)
		console.log(dataConfig)
            const json = dataConfig.get("messageReplies")
	    
	    console.log(json)
            const triggers = new Map(Object.entries(json))
            const content = message.content
            const roles = message.member.roles.cache.map(r => `${r}`).length

            /*
            if(userId == 865929450109009941){
                let rand = Math.floor(Math.random() * 38) //para choosed 38 ^^

                if (rand == 32){
                    await message.delete()
                    await message.author.send("**Bravo ! Tu avais 1 chance sur 38 de faire 32 ^^\n et Souviens-toi, il ne faut pas oublier :3**```"+message.content+"```")

                }

            }
            */

            triggers.forEach((reply,trigger)=>{
                if (content.includes(trigger)) {
                    message.reply(reply)
                }
            })

            if(channelId == dataConfig.get("channels.text")){
                await message.delete()
                await message.author.send("__**Impossible d'envoyer ce message :**__```md\n#Tu dois faire /post pour poster ton texte :D```")
            }

            if(channelId == dataConfig.get("channels.general")){
                const today = new Date()
                const recall = new Date(data.get("bump"))

                if(today > recall){
                    await message.reply("***Bumpy ! :3***")
                    today.setFullYear(today.getFullYear()+66)
                    await data.set("bump", today.toString())

                    await data.save()
                    await dataUtils.upload()
                }

            }
                        
            if (roles == 1){
                if (message.attachments.size == 0 && !message.content.includes("http")) return
                message.delete()
                await message.author.send("__**Impossible d'envoyer ce message :**__```md\n#Tu ne peux poster ni lien, ni fichier, ni gif sans n'avoir jamais gagné de plumes :D```")
            }

        }else{

            if(userId == 1018969464739467317){

                if(!dataConfig.get("channels.nologs").includes(channelName) && message.flags.bitfield != 64){
                    await messageUtils.log(message,"logs")
                }

            }

            if(userId == 302050872383242240){
                const embeds = message.embeds

                embeds.forEach(embed =>{

                    if(embed.data.description.includes("Bump effectué !")){
                        const recall = new Date()
                        recall.setHours(("0" + (recall.getHours() + 2)).slice(-2))
                        recall.setMinutes(("0" + (recall.getMinutes() + 30)).slice(-2))
        
                        data.set("bump", recall.toString())
    
                        data.save()
                        dataUtils.upload()
                    }

                })

            }

        }
		
	}

}
