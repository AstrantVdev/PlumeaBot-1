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
        .setDescription("4 premières lettres de votre pseudo discord")
        .setMinLength(4)
        .setMaxLength(4)    
        .setRequired(true))
    .addStringOption(option => option
        .setName('description')
		    .setDescription("La description de votre post")
        .setRequired(true)),
	async execute(interaction) {
        const text = require("../utils/text.js")

        const user = interaction.member.user
        const id = user.id
        const titre = interaction.options.getString('titre')
        const description = interaction.options.getString('description')
        const dt_titre = interaction.options.getString('dt_titre')
        const dt_chapitre = interaction.options.getString('dt_chapitre')
        const dt_auteur = interaction.options.getString('dt_auteur')
        const dt = (dt_titre + dt_chapitre + dt_auteur).toUpperCase()
        var fichier = interaction.options.getAttachment('fichier')
        const extension = path.extname(fichier.name)

        if(extension != ".pdf"){
            await interaction.reply({ content: "C'est pas .PDF ca ;-;\nVa donc sur ce site :\n\n https://www.ilovepdf.com/fr", ephemeral: true });
            return;
        }

        if(!text.isInChannel(interaction.channel.id)){
            await interaction.reply({ content: "Pas le bon Channel", ephemeral: true });
            return;
        }

        if(text.exists(dt)){
            if(!id == text.author){
                await interaction.reply({ content: "Ce dt existe déjà ;-;", ephemeral: true });
                return;
            }else{
                await text.removeMessages(dt)
            }
        }

        //rename
        Object.defineProperty(fichier, 'name', {
            writable: true,
            value: dt + ".pdf"
        });

        let words
        async function countWords(str) {
            str = str.replace(/(^\s*)|(\s*$)/gi,"")
            str = str.replace(/[ ]{2,}/gi," ")
            str = str.replace(/\n /,"\n")
            words = str.split(' ').length
        }

        async function send() {
            const fileEmbed = new EmbedBuilder()
            .setColor(0x2C2F33)
            .setTitle(".\n.\n.");
            
            const embed = require("../utils/embed");
            const messageEmbed = embed.new()
            .setTitle(titre)
            .setAuthor({ name: `${interaction.user.username}` + ' | ' + words + ' mots', iconURL: 'https://i.imgur.com/TYeapMy.png', url: 'https://www.youtube.com/watch?v=xvFZjo5PgG0' })
            .setDescription(description)
    
            if(words > 20000){
                await interaction.reply({ content: '**NO !** Pas plus de 20k par semaine bro\nhttps://tenor.com/view/no-chad-giga-chad-giga-chet-gif-25063092', ephemeral: true });

            }else if (words < 1000){
                await interaction.reply({ content: '**NO !**  Soit un chad et envoie plus de 1000 mots bro\nhttps://tenor.com/view/no-chad-giga-chad-giga-chet-gif-25063092', ephemeral: true });

            }else{
                message1 = await interaction.reply({ embeds: [messageEmbed]});
                message2 = await interaction.channel.send({ embeds: [fileEmbed], files: [fichier] })
                await text.save(dt, words, user.id, user.username, message1.id, message2.id)
            }
        }

        pdf(fichier.url).then(function(data) {
            countWords(data.text)    
            send()
        })     

	},

}