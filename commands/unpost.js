const { SlashCommandBuilder, PermissionFlagsBits, CommandInteractionOptionResolver } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('unpost')
    .setDescription("Enlève l'embed d'un texte posté ainsi que ses informations dans la base de données")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const editJsonFile = require("edit-json-file")
        
    
    },
};