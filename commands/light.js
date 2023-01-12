const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
        .setName('light')
        .setDescription('be light')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),

    async execute(inter) {
        const c = await inter.channel
        const name = await c.name

	await inter.reply({content: 'uwu !', ephemeral: true})
	    
        let i = await 0
        let C = await setInterval(async function() {    
            let o = await 0

            let COUNT = await setInterval(function() {    
                console.log(c.name)
                client.channels.fetch(channel.id)
                .then(c => {
                    let n = c.name
                    n += '⭐'
                    c.setName(n)
                })
                o++

                if(o == 8){ 
                    console.log('reset')
                    client.channels.fetch(channel.id)
                    .then(c => {
                        c.setName(name)
                    })
                    i++
                    clearInterval(COUNT) 
                }

            }, 1000)

            if(i == 8){ 
                clearInterval(C) 
            }

        }, 10000)

    }
    
}
