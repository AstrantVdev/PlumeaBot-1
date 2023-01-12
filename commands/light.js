const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
        .setName('light')
        .setDescription('be light')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),

    execute(inter) {
        const c = inter.channel
        const name = c.name

	inter.reply({content: 'uwu !', ephemeral: true})
	    
        for(i = 0 ; i < 8 ; i++){

            for(o = 0 ; o < 8 ; o++){

                setTimeout(function() {
                    console.log(c.name)
                    let n = c.name
                    n += '⭐'
                    c.setName(n)
        
                }, 750)

            }

            console.log('reset')
            c.setName(name)

        }

    }
    
}
