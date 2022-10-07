module.exports = {

    new(){
        const { EmbedBuilder } = require('discord.js');

        const messageEmbed = new EmbedBuilder()
        .setColor(0x2C2F33)
        .setTimestamp()
        .setFooter({ text: 'scriptubot', iconURL: 'https://i.imgur.com/TYeapMy.png' });
        return messageEmbed
    }
    
}