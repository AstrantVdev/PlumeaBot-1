module.exports = {
	name: 'messageDelete',
	async execute(message) {
		const editJsonFile = require("edit-json-file")
        const dataConfig = editJsonFile(DATA_CONFIG)

		await client.channels.fetch(dataConfig.get("channels.delete"))
		.then(channel => channel.send("__Message suprimé de <@"+message.author.id+"> :__")
		).catch(console.error)

		await client.channels.fetch(dataConfig.get("channels.delete"))
		.then(channel => channel.send({content : message.content, embeds:message.embeds})
		).catch(console.error)		
	},

};