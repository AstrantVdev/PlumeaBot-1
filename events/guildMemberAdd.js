const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'guildMemberAdd',
	once: false,
	async execute(member) {
        const editJsonFile = require("edit-json-file")

        const channelfile = editJsonFile(CHANNELSPATH);
        const welcome = channelfile.get("welcome")
        const presentation = channelfile.get("presentation")

        const welcomeMessage = new EmbedBuilder()
        .setColor(0x2C2F33)
        .setDescription(`**Bienvenue sur Scriptura ${member.user}.**`)
        .setAuthor({ name: 'Youpiii !',iconURL: 'https://i.imgur.com/xr9Tmfi.png', url: 'https://discord.gg/Fz5xkA4X6f' })
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()
        
        const json = require("../utils/json.js")
        const id = json.intToABC(member.user.id)
        const membersfile = editJsonFile(CHANNELSPATH);

        members = membersfile.get("members.list")
        if(!members.includes(id)){
                const account = require("../utils/account")
                account.create(user)
        }

        await client.channels.fetch(welcome)
        .then(channel => channel.send({ embeds: [welcomeMessage]}));
		
	},
};