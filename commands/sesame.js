const { SlashCommandBuilder } = require('discord.js')

const editJsonFile = require("edit-json-file")
const dataConfig = editJsonFile(DATA_CONFIG)

module.exports = {
	data: new SlashCommandBuilder()
	.setName('sesame')
    .setDescription("Permet d'accéder au serveur")
    .addStringOption(option => option
        .setName('pass')
		.setDescription("Mot de passe dans la description du salon en haut")
        .setRequired(true)),

	async execute(interaction) {
        const pass = interaction.options.getString('pass')
		const member = interaction.member
		        plumeRole = dataConfig.get("rolesId.plumeRole")

        if(member.roles.cache.has(plumeRole)){
        interaction.reply({ content: 'Tu fais quoi là -_-', ephemeral: true })

        }else{
		
		if(pass === "050123"){
			await member.roles.add(plumeRole)
        		await interaction.reply({ content: 'Bienvenue', ephemeral: true })
			
			await interaction.member.send("> 📕▸**Bienvenue sur Pluméa !**\n\n 🧭 ▸Le guide du Pluméen contient toutes les informations nécessaires sur le bon fonctionnement de la communauté : *règles générales, comment poster son avis, comment poster son texte...*\n"+
"https://discord.com/channels/1027089727360344144/1063760987238436924\n\n"+

"👤 ▸Et si vous nous en disiez plus sur vous ? \n"+
"https://discord.com/channels/1027089727360344144/1060681609751310336\n\n"+

"📖▸Postez votre texte et retrouvez ceux des membres !\n"+
"https://discord.com/channels/1027089727360344144/1060687578413674646\n\n"+

"📋▸Retrouvez un espace pour poster vos commentaires !\n"+
"https://discord.com/channels/1027089727360344144/1060687321579659425\n\n"+

"💬 ▸Passez nous dire bonjour, ne soyez pas timide !\n"+
"https://discord.com/channels/1027089727360344144/1060677819107115088\n\n"+

"📬▸Un tournois de nouvelle est organisée tous les mois. A vos plumes !\n"+
"https://discord.com/channels/1027089727360344144/1060679258579669083\n\n"+

"🎫▸Un soucis ? Une question ? L'équipe de Pluméa veille.\n"+
"https://discord.com/channels/1027089727360344144/1060681924877766786\n\n"+

"> 📸 nos réseaux :\n"+
"__INSTAGRAM__\n"+
"https://instagram.com/plumea.fr?igshid=ZDdkNTZiNTM=\n\n"+

"https://imgur.com/92562no")
		}else{
		await interaction.reply({ content: 'Mauvais mot de passe.. Mot de passe dans la description du salon en haut', ephemeral: true })

		}


        }
    
    

	}

}
