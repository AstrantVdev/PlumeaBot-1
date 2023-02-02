const { SlashCommandBuilder } = require('discord.js');

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
        interaction.reply({ content: 'Bienvenue uwu', ephemeral: true })
		
		        sprinterRole = dataConfig.get("rolesId.sprinter")

        if(member.roles.cache.has(sprinterRole)){
            await member.roles.remove(sprinterRole)
            await interaction.reply({content:"Tu n'es plus un sprinter à présent ! :3\nTu seras donc plus jamais mentionné ! Tous du moins pour les sprints...",ephemeral:true})

        }else{
            await member.roles.add(sprinterRole)
            await interaction.reply({content:"Tu es sprinter à présent ! :3\nTu seras donc mentionné à chaque sprint...",ephemeral:true})

        }
    
    

	}

}
