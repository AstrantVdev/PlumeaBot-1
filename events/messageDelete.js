module.exports = {
	name: 'messageDelete',
	async execute(message) {
		const editJsonFile = require("edit-json-file")
        const dataConfig = editJsonFile(DATA_CONFIG)
		const messageUtil = require("../utils/message")

		if (message.channel.type === "dm") {
			return
		}

		messageUtil.log(message,"delete")
	
	}

}