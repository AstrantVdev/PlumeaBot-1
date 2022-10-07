module.exports = {
	name: 'messageCreate',
	async execute(message) {

        if (!message.author.bot){

            if (message.content.includes("CHAD")) {
                message.channel.send(`https://tenor.com/view/mujikcboro-seriymujik-gif-24361533`);
            }            

            let roles = message.member.roles.cache.map(r => `${r}`).length;

            if (roles == 1){
                if (message.attachments.size == 0 && !message.content.includes("http")) return;

                await message.author.send("__**Impossible d'envoyer ce message :**__```md\n#Tu ne peux poster ni lien, ni fichier, ni gif sans n'avoir jamais gagné de plumes :D```");
                message.delete();

            }

        }
		
	},

};