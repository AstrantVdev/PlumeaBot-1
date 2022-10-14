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
        .setRequired(true))    
    .addStringOption(option => option
        .setName('dt')
        .setDescription("8-11 lettres rapportant au texte")
        .setMinLength(12)
        .setMaxLength(15)    
        .setRequired(true)),

        async execute(interaction) {
            const plume = require("../utils/plume.js")
            const json = require("../utils/json.js")
            const leaderboard = require("../utils/leaderboard.js")
            const data = require("../utils/data.js")
            const editJsonFile = require("edit-json-file")

            const member = interaction.options.getMember('user')
            const dt = interaction.options.getString('dt')
            const memberId = member.id
            const stringId = json.intToABC(memberId)
            const p = interaction.options.getInteger('plumes')    

            let jsonfile = editJsonFile(DATA);
            plumes = jsonfile.get("members."+stringId + ".plumes")

            plumes += p

            await jsonfile.set("members." + stringId + ".plumes", plumes)
            await jsonfile.save()

            await plume.roles(member, plumes, interaction)

            await leaderboard.edit()

            await data.upload()

            message = "**<@" + memberId + "> possède maintenant *" + plumes + "* plumes <:Scriptuplume:1027094890099781673>**\n"
            message += p+" plumes\n"
            message += dt+"\n"
            await interaction.reply(message)
                
        }
    }