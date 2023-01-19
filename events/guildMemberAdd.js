module.exports = {
	name: 'guildMemberAdd',
	once: false,
	async execute(member) {
        const editJsonFile = require("edit-json-file")
        const message = require("../utils/message")

        const channelfile = editJsonFile(DATA_CONFIG);
        const welcome = channelfile.get("channels.welcome")
        const presentation = channelfile.get("presentation")
        const user = member.user

        welcomeMessage = message.newEmbed()
        .setDescription(`**Bienvenue sur Scriptura ${member.user}.**`)
        .setAuthor({ name: 'Youpiii !',iconURL: 'https://i.imgur.com/TYeapMy.png', url: 'https://tenor.com/view/rickroll-roll-rick-never-gonna-give-you-up-never-gonna-gif-22954713' })
        .setThumbnail(member.user.displayAvatarURL())
        
        const json = require("../utils/json.js")
        const id = json.intToABC(member.user.id)
        const data = editJsonFile(DATA);

        members = data.get("members.list")
        if(!members.includes(id)&& !user.bot){
                const dataUtil = require("../utils/data")
                dataUtil.accountCreate(member.user)
        }

        await client.channels.fetch(welcome)
        .then(channel => channel.send({ embeds: [welcomeMessage]}))
		
	await member.send("> 📕▸**Bienvenue sur Pluméa !** 🧭 ▸Le guide du Pluméen contient toutes les informations nécessaires sur le bon fonctionnement de la communauté : *règles générales, comment poster son avis, comment poster son texte...*\n"+
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
	}

}
