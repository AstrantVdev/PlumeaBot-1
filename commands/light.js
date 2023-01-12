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
	    
        for(i = 0 ; i < 8 ; i++){

            for(o = 0 ; o < 8 ; o++){

                setTimeout(async function() {
                    console.log(c.name)
                    let name = c.name
                    name = name + '⭐'
                    await c.setName(name)
        
                }, 750)

            }

            console.log('reset')
            await c.setName(name)

        }

    }
    
}
