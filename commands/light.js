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
	    
        for(i = 0 ; i < 8 ; await i++){

            for(o = 0 ; o < 8 ; await o++){

                await setTimeout(async function() {
                    console.log(c.name)
                    let n = c.name
                    n += '⭐'
                    await c.setName(n)
        
                }, 750)

            }

            await console.log('reset')
            await c.setName(name)

        }

    }
    
}
