const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
        .setName('light')
        .setDescription('be light')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),

    async execute(inter) {
        const c = inter.channel
        const name = c.name

	inter.reply({content: 'uwu !', ephemeral: true})
	    
        let i = 0
        while(i < 8){
            let o = 0

            while(o < 8){

                await setTimeout(async function() {
                    console.log(c.name)
                    let n = c.name
                    n += '⭐'
                    await c.setName(n)
                    await o++

                }, 750)

            }

            await console.log('reset')
            await c.setName(name)
            await i++
        }

    }
    
}
