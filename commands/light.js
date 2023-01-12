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
                    let name = c.name
                    name = name + '⭐'
                    c.setName(name)
        
                }, 750)

            }

            c.setName(name)

        }

    }
    
}
