module.exports = {
	name: 'guildMemberAdd',
	once: false,
	async execute(member) {
        const editJsonFile = require("edit-json-file")
        const embed = require("../utils/embed")

        const channelfile = editJsonFile(CHANNELSPATH);
        const welcome = channelfile.get("welcome")
        const presentation = channelfile.get("presentation")

        welcomeMessage = embed.new()
        .setDescription(`**Bienvenue sur Scriptura ${member.user}.**`)
        .setAuthor({ name: 'Youpiii !',iconURL: 'https://i.imgur.com/TYeapMy.png', url: 'https://www.youtube.com/watch?v=xvFZjo5PgG0' })
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
