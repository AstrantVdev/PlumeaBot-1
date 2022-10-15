module.exports = {
	name: 'guildMemberAdd',
	once: false,
	async execute(member) {
        const editJsonFile = require("edit-json-file")
        const embed = require("../utils/embed")

        const channelfile = editJsonFile(DATA_CONFIG);
        const welcome = channelfile.get("channels.welcome")
        const presentation = channelfile.get("presentation")
        const user = member.user

        welcomeMessage = embed.new()
        .setDescription(`**Bienvenue sur Scriptura ${member.user}.**`)
        .setAuthor({ name: 'Youpiii !',iconURL: 'https://i.imgur.com/TYeapMy.png', url: 'https://www.youtube.com/watch?v=xvFZjo5PgG0' })
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
	}
}
