const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
	.setName("happy")
    .setDescription("be happy new year")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),
	execute(interaction) {
        const general = interaction.channel.id

        interaction.reply("hey !")

        const messages = ["https://tenor.com/view/perfect-10-score-gif-7911501",
        "https://tenor.com/view/wow-omg-surprised-scared-kid-gif-15526979",
        "https://tenor.com/view/six-chaka-latest-cricket-sports-gif-3502016323564987583",
        "https://tenor.com/view/four-four-fingers-up-stern-the-number4-alex-gif-15882276",
        "https://tenor.com/view/cubs-two-gif-18187716",
        "https://tenor.com/view/happy-new-year-fireworks-animated-text-2018-gif-10651097"]

        const start = new Date()
        start.setHours(("0" + 18).slice(-2))
        start.setMinutes(("0" + 29).slice(-2))
        start.setSeconds(("0" + 50).slice(-2))

        let WAIT = setInterval(function() {      
            const date = new Date()
            console.log(date)
            console.log(start)

            if(date == start){ clearInterval(WAIT) }
            console.log("o")

        }, 500)

        const date = new Date()
        if(date >= start){
                    client.channels.fetch(general)
            .then(channel => {
                channel.send(messages[0])
    
                count = 1
                let COUNT = setInterval(function() {      
                    channel.send(messages[count])
    
                    if(count == 0){ clearInterval(COUNT) }
                    count--
                    console.log("i")
    
                }, 2000)
    
        }).catch(console.error)
        }

	}

}
