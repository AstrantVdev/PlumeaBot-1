const { SlashCommandBuilder, PermissionFlagsBits, CommandInteractionOptionResolver } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('unpost')
    .addStringOption(option => option
        .setName('dt')
        .setDescription("12-15 lettres rapportant à votre œuvre (ex : YAMETE01-02ONIC pour Yamete chap01-02 de Onichan)")
        .setMinLength(12)
        .setMaxLength(15)    
        .setRequired(true))
    .setDescription("Enlève l'embed d'un texte posté ainsi que ses informations dans la base de données"),

    async execute(interaction) {
        const text = require("../utils/text.js")

        const dt = interaction.options.getString("dt")
        const member = interaction.member
        const user = member.user

        if(text.isAuthor() || member.hasPermission("ADMINISTRATOR")){
            text.delete(dt)
            await interaction.reply({content:"Congrats !",ephemeral:true})

        }else{
            await interaction.reply({content:"**C'est pas ton texte petit filou ! :3**",ephemeral:true})
        }
    
    }

}