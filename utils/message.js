module.exports = {

    newEmbed(){
        const { EmbedBuilder } = require('discord.js');

        const messageEmbed = new EmbedBuilder()
        .setColor(0x2C2F33)
        .setTimestamp()
        .setFooter({ text: 'PluméaBot', iconURL: 'https://i.imgur.com/TYeapMy.png' });
        return messageEmbed
    },

    get(message){
        const attached = message.attachments
		const content = message.content
		const embeds = message.embeds

        let mes = "<#"+message.channel.id+">  "
		mes += "<@"+message.author.id+">\n\n"

		if(content != null){
			mes += content
		}
	
		attached.forEach(attach => {	
			isAttached = true
			mes += attach.url + "\n\n"
		})

        return {content:mes,embeds:embeds}

    },

    log(message, type){
        const messageUtil = require("./message")
        const editJsonFile = require("edit-json-file")
        const dataConfig = editJsonFile(DATA_CONFIG)

        client.channels.fetch(dataConfig.get("channels."+type))
		.then(channel => channel.send(messageUtil.get(message)))
		.catch(console.error)
    },

    getChannel(id){

        client.channels.fetch(id)
        .then(channel => {return channel
         }).catch(console.error)

    },

    getMessage(id, channelId){

        this.getChannel(channelId).messages.fetch(id)
        .then(m => {
            return m
        }).catch(console.error)

    }
    
}
