const { SlashCommandBuilder, PermissionFlagsBits, CommandInteractionOptionResolver } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
	.setName('plumes')
    .setDescription('Ajoute un nombre de points à un scripturien, négatif ou positif, au choix')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption(option => option
        .setName('user')
		.setDescription("Utilisateur")
        .setRequired(true))
    .addIntegerOption(option => option
        .setMinValue(-99)
        .setMaxValue(99)
        .setName('plumes')
		.setDescription("Nombre de Points à rajouter/enlever")
        .setRequired(true)),

        async execute(interaction) {
            const plume = require("../utils/plume.js")
            const json = require("../utils/json.js")
            const editJsonFile = require("edit-json-file")

            const member = interaction.options.getMember('user')
            const memberId = member.id
            const stringId = json.intToABC(memberId)
            const p = interaction.options.getInteger('plumes')    

            let jsonfile = editJsonFile(MEMBERSPATH);
            plumes = jsonfile.get(stringId + ".plumes")
            
            console.log(stringId)
            console.log(plumes)
            console.log(p)

            plumes += p

            await jsonfile.set(stringId + ".plumes", plumes)
            await jsonfile.save()
            
            await plume.roles(member, plumes, interaction)

            await interaction.reply("**<@" + memberId + "> possède maintenant *" + plumes + "* plumes <:plume:1024014166022955078>**")
    
        },
    }
