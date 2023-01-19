const { SlashCommandBuilder, PermissionFlagsBits, CommandInteractionOptionResolver } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('membercount')
    .setDescription('Donne le nombre de membres (bot exclu)'),

    async execute(interaction) {
        let count = interaction.guild.memberCount
        count -= interaction.guild.members.cache.filter(m => m.user.bot).size

        await interaction.reply("> 📕▸**Bienvenue sur Pluméa !**

🧭 ▸Le guide du Pluméen contient toutes les informations nécéssaires sur le bon fonctionnement de la communauté : *règles générales, comment poster son avis, comment poster son texte...*
https://discord.com/channels/1027089727360344144/1063760987238436924

👤 ▸Et si vous nous en disiez plus sur vous ? 
https://discord.com/channels/1027089727360344144/1060681609751310336

📖▸Postez votre texte et retrouvez ceux des membres !
https://discord.com/channels/1027089727360344144/1060687578413674646

📋▸Retrouvez un espace pour poster vos commentaires !
https://discord.com/channels/1027089727360344144/1060687321579659425

💬 ▸Passez nous dire bonjour, ne soyez pas timide !
https://discord.com/channels/1027089727360344144/1060677819107115088

📬▸Un tournois de nouvelle est organisée tous les mois. A vos plumes !
https://discord.com/channels/1027089727360344144/1060679258579669083

🎫▸Un soucis ? Une question ? L'équipe de Pluméa veille. 
https://discord.com/channels/1027089727360344144/1060681924877766786

> 📸 nos réseaux :
__INSTAGRAM__
https://instagram.com/plumea.fr?igshid=ZDdkNTZiNTM=

https://imgur.com/92562no")
    const o = "**Aujourd'hui Scriptura compte ||   " + count  + "   || âmes ! :D**"
    }
}
