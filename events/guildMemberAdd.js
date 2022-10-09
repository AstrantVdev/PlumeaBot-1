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
        const membersfile = editJsonFile("../MEMBERS.js");
		
        members = membersfile.get("list")
		
        console.log(membersfile + "/" + editJsonFile + "/" + MEMBERSPATH)

        if(!members.includes(id)){
                const today = new Date()
                const date = ("0" + today.getDate()).slice(-2);
                const month = ("0" + (today.getMonth() + 1)).slice(-2);
                const year = today.getFullYear();
                let list = membersfile.get("list")
                list.push(id)

                await membersfile.set("list", list)
                await membersfile.set(id +".date", year+month+date)
                await membersfile.set(id+".plumes", 0)
                await membersfile.set(id+".scriptucoins", 0)
                await membersfile.save()

        }

        await client.channels.fetch(welcome)
        .then(channel => channel.send({ embeds: [welcomeMessage]}));
		
	},
};
