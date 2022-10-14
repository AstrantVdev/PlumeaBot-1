module.exports = {
	name: 'messageCreate',
	async execute(message) {
        const editJsonFile = require("edit-json-file")
        const dataConfig = editJsonFile(DATA_CONFIG)
        const channelId = message.channel.name
        userId = message.author.id

        if (!message.author.bot){
            json = dataConfig.get("messageReplies")
            const triggers = new Map(Object.entries(json))
            const content = message.content

            triggers.forEach((reply,trigger)=>{
                if (content.includes(trigger)) {
                    message.reply(reply)
                }
            })

            if(channelId == dataConfig.get("channels.text")){
                message.delete()
                await message.author.send("__**Impossible d'envoyer ce message :**__```md\n#Tu dois faire /post pour poster ton texte :D```")
            }
                        
            let roles = message.member.roles.cache.map(r => `${r}`).length

            if (roles == 1){
                if (message.attachments.size == 0 && !message.content.includes("http")) return
                message.delete()
                await message.author.send("__**Impossible d'envoyer ce message :**__```md\n#Tu ne peux poster ni lien, ni fichier, ni gif sans n'avoir jamais gagné de plumes :D```")
            }

        }else{

            if(!dataConfig.get("channels.nologs").includes(channelId) && message.flags.bitfield != 64){
                client.channels.fetch(dataConfig.get("channels.logs"))
                .then(channel => 
                    channel.send({content : message.content, files: message.attachments, embeds: message.embeds})
                
                    .catch(console.error)
                ).catch(console.error)
                
            }

            if(userId == 302050872383242240){
                async function recall() {
                    await client.channels.fetch(dataConfig.get("channels.general"))
                    .then(channel => channel.send("***BUMPEZ BANDE DE WELWITSCHIA  MIRABILIS !!! è-é***")
                    ).catch(console.error)
                }
                  
                setTimeout(recall, 7200*1000, 'bump !')
            }

        }
		
	}

}