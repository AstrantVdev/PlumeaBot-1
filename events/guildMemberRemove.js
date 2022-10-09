const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'guildMemberRemove',
	once: false,
	async execute(member) {
        const editJsonFile = require("edit-json-file")

        const channelfile = editJsonFile(CHANNELSPATH);
        const welcome = channelfile.get("cya")

        const welcomeMessage = new EmbedBuilder()
        .setColor(0x2C2F33)
        .setDescription(`**${member.user} nous a quitté !!!**`)
        .setAuthor({ name: 'Niooon !',iconURL: 'https://i.imgur.com/xr9Tmfi.png', url: 'https://discord.gg/Fz5xkA4X6f' })
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()

        await client.channels.fetch(welcome)
        .then(channel => channel.send({ embeds: [welcomeMessage]}));
		
	},
};
