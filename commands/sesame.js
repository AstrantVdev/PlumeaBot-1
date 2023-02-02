const { SlashCommandBuilder } = require('discord.js')

const editJsonFile = require("edit-json-file")
const dataConfig = editJsonFile(DATA_CONFIG)

module.exports = {
	data: new SlashCommandBuilder()
	.setName('sesame')
    .setDescription("Permet d'accéder au serveur uwu")
    .addStringOption(option => option
        .setName('pass')
		.setDescription("Mot de passe dans la description du salon")
        .setRequired(true)),

	async execute(interaction) {
        const n = interaction.options.getString('pass')
		const member = interaction.member
		        plumeRole = dataConfig.get("rolesId.plumeRole")

        if(member.roles.cache.has(plumeRole)){
        interaction.reply({ content: 'Tu fais quoi là -_-', ephemeral: true })

        }else{
		
		if(pass === "050123"){
			await member.roles.add(plumeRole)
        		await interaction.reply({ content: 'Bienvenue uwu', ephemeral: true })
		}else{
		await interaction.reply({ content: 'Mauvais mot de passe..', ephemeral: true })

		}


        }
    
    

	}

}
