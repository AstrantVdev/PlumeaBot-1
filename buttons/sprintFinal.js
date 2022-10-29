const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    
    async execute(interaction){
		const modal = new ModalBuilder()
			.setCustomId('sprintFinalWords')
			.setTitle('Nombre de Mots à la fin :D');

		const words = new TextInputBuilder()
			.setCustomId('words')
			.setLabel("n")
            .setMinLength(2)
            .setRequired(true)
            .setMaxLength(6)
			.setStyle(TextInputStyle.Short)

		const firstActionRow = new ActionRowBuilder().addComponents(words)

		modal.addComponents(firstActionRow)

		await interaction.showModal(modal)       
    }

}