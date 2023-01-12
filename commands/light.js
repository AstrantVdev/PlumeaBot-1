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
        while(i < 8){
            let o = await 0

            while(o < 8){

                await setTimeout(async function() {
                    await console.log(c.name)
                    let n = await c.name
                    n += await '⭐'
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
