const { SlashCommandBuilder, PermissionFlagsBits, CommandInteractionOptionResolver } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('check-inactives')
    .setDescription("Renvoie une liste des membres sans point et présents depuis au moins un mois")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const editJsonFile = require("edit-json-file")
        let message = "\n"

        const today = new Date()
        today.setDate(today.getDate() - 30);
        const date = ("0" + today.getDate()).slice(-2);
        const month = ("0" + (today.getMonth() + 1)).slice(-2);
        const year = today.getFullYear();
        const todayInt = parseInt(year+month+date)

        const membersfile = editJsonFile(CHANNELSPATH);
        const members = membersfile.get("members.list")
        let n = 0

        members.forEach(id=>{
            const json = require("../utils/json.js")
            const plumes = membersfile.get("members."+id+".plumes")
            const date = membersfile.get("members."+id+".date")
            const dateInt = parseInt(date)

            if(plumes <= 0 && dateInt <= todayInt){
                id = json.ABCtoInt(id)
                message += ("<@"+id+">   Plumes : **"+plumes+"** - Arrivée : **"+date+"**\n")
                n++
            }

        })

        const embed = require('../utils/embed');
        const messageEmbed = embed.new()
        .setTitle("__**Liste des membres sans point et présents depuis au moins un mois : **__" + n)
        .setDescription(message)
        await interaction.reply({ embeds: [messageEmbed]});
    
    },
};