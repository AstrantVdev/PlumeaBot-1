const { SlashCommandBuilder, PermissionFlagsBits, CommandInteractionOptionResolver } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('membercount')
    .setDescription('Donne le nombre de membres (bot exclu)'),

    async execute(interaction) {
        let count = interaction.guild.memberCount
        count -= interaction.guild.members.cache.filter(m => m.user.bot).size
        await interaction.reply("> 📕▸**Bienvenue sur Pluméa !** 🧭 ▸Le guide du Pluméen contient toutes les informations nécessaires sur le bon fonctionnement de la communauté : *règles générales, comment poster son avis, comment poster son texte...*\n"+
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
    const o = "**Aujourd'hui Scriptura compte ||   " + count  + "   || âmes ! :D**"
    }
}
