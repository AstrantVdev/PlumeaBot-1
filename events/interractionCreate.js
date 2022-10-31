const dataUtil = require("../utils/data.js")

module.exports = {
	name: 'interactionCreate',
	once: false,
	async execute(interaction) {
		const member = interaction.member

		if (interaction.isChatInputCommand()){
			const command = interaction.client.commands.get(interaction.commandName);
	
			if (!command) return;
		
			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error)
				await interaction.reply({ content: "J'y arrive po ;-; Appelle mon papa Asra", ephemeral: true });
			}

		}else if(interaction.isButton()){
			const buttonId = interaction.customId

			switch(buttonId){
				case "sprintRole":
					const sprintRole = require("../buttons/sprintRole.js")
					sprintRole.execute(member, interaction)
				break;
				case "sprintJoin":
					const sprintJoin = require("../buttons/sprintJoin.js")
					sprintJoin.execute(interaction)
				break;
				case "sprintFinal":
					const sprintFinal = require("../buttons/sprintFinal.js")
					sprintFinal.execute(interaction)
				break;
			}

		}else if(interaction.isModalSubmit()){
			const modalId = interaction.customId

			switch(modalId){
				case "sprintWords":
					const sprintWords = require("../modalSubmit/sprintWords.js")
					sprintWords.execute(member, interaction)
				break;
				case "sprintFinalWords":
					const sprintFinalWords = require("../modalSubmit/sprintFinalWords.js")
					sprintFinalWords.execute(member, interaction)
				break;
			}

		}

		setTimeout(() =>dataUtil.upload(), 3000)
		
	}

}
