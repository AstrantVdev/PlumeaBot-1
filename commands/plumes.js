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
            const editJsonFile = require("edit-json-file")
            const fs = require('fs')

            const member = interaction.options.getMember('user')
            const memberId = member.id
            const p = interaction.options.getInteger('plumes')    
            const fileName = DATAPATH;
            const file = require(fileName);

            let jsonfile = editJsonFile(MEMBERSPATH);
            plumes = jsonfile.get(memberId + ".plumes")
            date = jsonfile.get(memberId + ".date")

            plumes += p
    
            file[memberId] = {plumes: plumes, date: date};
    
            fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
              if (err) return console.log(err);
            })
            
            await plume.roles(member, plumes, interaction)

            await interaction.reply("**<@" + memberId + "> possède maintenant *" + plumes + "* plumes <:plume:1024014166022955078>**")
    
        },
    }