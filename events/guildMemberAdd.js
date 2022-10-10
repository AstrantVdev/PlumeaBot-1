module.exports = {
	name: 'guildMemberAdd',
	once: false,
	async execute(member) {
        const editJsonFile = require("edit-json-file")

        const channelfile = editJsonFile(CHANNELSPATH);
        const welcome = channelfile.get("welcome")
        const presentation = channelfile.get("presentation")

        welcomeMessage = embed.new()
        .setDescription(`**Bienvenue sur Scriptura ${member.user}.**`)
        .setAuthor({ name: 'Youpiii !',iconURL: 'https://i.imgur.com/TYeapMy.png', url: 'https://discord.gg/cE9rz3cagx' })
        .setThumbnail(member.user.displayAvatarURL())
        
        const json = require("../utils/json.js")
        const id = json.intToABC(member.user.id)
        const membersfile = editJsonFile(CHANNELSPATH);

        members = membersfile.get("members.list")
        if(!members.includes(id)){
                const account = require("../utils/account")
                account.create(member.user)
        }

        await client.channels.fetch(welcome)
        .then(channel => channel.send({ embeds: [welcomeMessage]}));
		
	},
};
