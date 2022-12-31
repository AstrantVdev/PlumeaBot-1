const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
	.setName("happy")
    .setDescription("be happy new year")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),
	async execute(interaction) {
        const general = interaction.channel.id

        const messages = ["https://tenor.com/view/perfect-10-score-gif-7911501",
        "https://tenor.com/view/wow-omg-surprised-scared-kid-gif-15526979",
        "https://tenor.com/view/six-chaka-latest-cricket-sports-gif-3502016323564987583",
        "https://tenor.com/view/four-four-fingers-up-stern-the-number4-alex-gif-15882276",
        "https://tenor.com/view/cubs-two-gif-18187716",
        "https://tenor.com/view/happy-new-year-fireworks-animated-text-2018-gif-10651097"]

        let start = new Date().getDate
        start = start.setHours(18)
        start = start.setHours(26)
        start = start.setSeconds(49)

        let WAIT = setInterval(function() {      
            const date = new Date().getDate

            if(date == start){ clearInterval(WAIT) }

        }, 500)

        client.channels.fetch(general)
        .then(channel => {
            channel.send(messages[5])

            count = 4
            let COUNT = setInterval(function() {      
                channel.send(messages[count])

                if(count == 0){ clearInterval(COUNT) }
                count--
    
            }, 2000)

    }).catch(console.error)

	}

}
