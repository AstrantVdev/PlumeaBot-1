const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const path = require('path');
const pdf = require('pdf-parse');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('post')
    .setDescription('Poster son texte')
    .addAttachmentOption(option => option
        .setName('fichier')
        .setDescription('Votre texte sous format PDF')
        .setRequired(true))
    .addStringOption(option => option
        .setName('titre')
		    .setDescription('Le Titre de votre texte')
		    .setRequired(true))
    .addStringOption(option => option
        .setName('dt_titre')
        .setDescription("6 lettres rapportant à votre œuvre (ex : LGUIDE pour Le Guide de Para)")
        .setMinLength(6)
        .setMaxLength(6)    
        .setRequired(true))
    .addStringOption(option => option
        .setName('dt_chapitre')
        .setDescription("le(s) chapitre (s) publié(s) (ex: 00 ou 01 ou 01-03)")
        .setMinLength(2)
        .setMaxLength(5)    
        .setRequired(true))
    .addStringOption(option => option
        .setName('dt_auteur')
        .setDescription("DT identifiant")
        .setMinLength(4)
        .setMaxLength(4)    
        .setRequired(true))
    .addStringOption(option => option
        .setName('description')
		    .setDescription("La description de votre post")
        .setRequired(true)),
	async execute(interaction) {
        const titre = interaction.options.getString('titre')
        const description = interaction.options.getString('description')
        const dt_titre = interaction.options.getString('dt_titre')
        const dt_chapitre = interaction.options.getString('dt_chapitre')
        const dt_auteur = interaction.options.getString('dt_auteur')
        const identifiant = dt_titre + dt_chapitre + dt_auteur
        var fichier = interaction.options.getAttachment('fichier')
        const extension = path.extname(fichier.name)

        //save
        //fetch(fichier.url)
        //.then(res => res.text())
        //.then(text => console.log(text));

        if(extension != ".pdf"){
            await interaction.reply({ content: "C'est pas .PDF ca ;-;\nVa donc sur ce site :\n\n https://www.ilovepdf.com/fr", ephemeral: true });
            return;
        }

        //rename
        Object.defineProperty(fichier, 'name', {
            writable: true,
            value: identifiant + ".pdf"
        });

        //count words
        let words
        async function countWords(str) {
            str = str.replace(/(^\s*)|(\s*$)/gi,"")
            str = str.replace(/[ ]{2,}/gi," ")
            str = str.replace(/\n /,"\n")
            words = str.split(' ').length
        }
         
        pdf(fichier.url).then(function(data) {
            countWords(data.text)    

            //send messages
            const fileEmbed = new EmbedBuilder()
            .setColor(0x2C2F33)
            .setTitle(".\n.\n.");
            
            const embed = require(path.join('embed'));
            const messageEmbed = embed.new()
            .setTitle(titre)
            .setAuthor({ name: `${interaction.user.username}` + ' | ' + words + ' mots', iconURL: 'https://i.imgur.com/xr9Tmfi.png', url: 'https://discord.gg/Fz5xkA4X6f' })
            .setDescription(description)
    
            if(words <= 20000){
                interaction.reply({ embeds: [messageEmbed]});
                interaction.channel.send({ embeds: [fileEmbed], files: [fichier] })
            }else{
                interaction.reply({ content: '**NO !** Pas plus de 20k par semaine bro\nhttps://tenor.com/view/no-chad-giga-chad-giga-chet-gif-25063092', ephemeral: true });
            }

        })     

	},

}