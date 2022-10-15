module.exports = {
	name: 'messageDelete',
	async execute(message) {
		const editJsonFile = require("edit-json-file")
        const dataConfig = editJsonFile(DATA_CONFIG)

		const attached = message.attachments
		const content = message.content
		const embeds = message.embeds

		if (message.channel.type === "dm") {
			return
		}
		
		let mes = `Channel: ${message.channel.name}\n`
		mes += `Author: ${message.author.tag}\n\n`
		mes = "```"+mes+"```"

		if(content != null){
			mes += content
		}
	
		attached.forEach(attach => {	
			isAttached = true
			mes += attach.url + "\n\n"
		})

		await client.channels.fetch(dataConfig.get("channels.delete"))
		.then(channel => channel.send({content:mes,embeds:embeds}))
		.catch(console.error)
	
	}

}