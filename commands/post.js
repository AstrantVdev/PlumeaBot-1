const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const path = require("path");
const pdf = require("pdf-parse");
const member = require("../utils/member.js");

module.exports = {
	data: new SlashCommandBuilder()
	.setName("post")
    .setDescription("Poster son texte")
    .addAttachmentOption(option => option
        .setName("fichier")
        .setDescription("Votre texte sous format PDF")
        .setRequired(true))
    .addStringOption(option => option
        .setName("titre")
		    .setDescription("Le Titre de votre texte")
		    .setRequired(true))
    .addStringOption(option => option
        .setName("dt_titre")
        .setDescription("6 lettres rapportant à votre œuvre (ex : LGUIDE pour Le Guide de Para)")
        .setMinLength(6)
        .setMaxLength(6)    
        .setRequired(true))
    .addStringOption(option => option
        .setName("dt_chapitre")
        .setDescription("le(s) chapitre (s) publié(s) (ex: 00 ou 01 ou 01-03)")
        .setMinLength(2)
        .setMaxLength(5)    
        .setRequired(true))
    .addStringOption(option => option
        .setName("dt_auteur")
        .setDescription("4 premières lettres de votre pseudo discord")
        .setMinLength(4)
        .setMaxLength(4)    
        .setRequired(true))
    .addStringOption(option => option
        .setName("description")
		    .setDescription("La description de votre post")
        .setRequired(true)),
	async execute(interaction) {
        const text = require("../utils/text.js")
        const messageUtil = require("../utils/message")
        const editJsonFile = require("edit-json-file")
        const dataConfig = editJsonFile(DATA_CONFIG)
        const membersUtil = require("../utils/member.js")

        const member = interaction.member
        const user = member.user

        const titre = interaction.options.getString("titre")
        const description = interaction.options.getString("description")

        const dt_titre = interaction.options.getString("dt_titre")
        const dt_chapitre = interaction.options.getString("dt_chapitre")
        const dt_auteur = interaction.options.getString("dt_auteur")
        const dt = (dt_titre + dt_chapitre + dt_auteur).toUpperCase()

        let fichier = interaction.options.getAttachment("fichier")
        const extension = path.extname(fichier.name)

        if(extension != ".pdf"){
            await interaction.reply({ content: "C'est pas .PDF ca ;-;\nVa donc sur ce site :\n\n https://www.ilovepdf.com/fr", ephemeral: true });
            return
        }

        if(!text.isInChannel(interaction.channel.id)){
            await interaction.reply({ content: "Pas le bon Channel, va dans <#"+dataConfig.get("channels.text")+">", ephemeral: true });
            return
        }

        async function exist (){
            if(text.exists(dt)){
                if(!user.id == text.author){
                    await interaction.reply({ content: "Ce dt existe déjà ;-;", ephemeral: true });
                    return
                }else{
                    await text.remove(dt)
                    await membersUtil.removeText(user.id, dt)
                }
            }
        }
       
        //rename
        Object.defineProperty(fichier, "name", {
            writable: true,
            value: dt + ".pdf"
        })

        let words
        async function countWords(str) {
            str = str.replace(/(^\s*)|(\s*$)/gi,"")
            str = str.replace(/[ ]{2,}/gi," ")
            str = str.replace(/\n /,"\n")
            words = str.split(" ").length
        }

        async function send(){
            const fileEmbed = new EmbedBuilder()
            .setColor(0x2C2F33)
            .setTitle(".\n.\n.");
            
            const messageEmbed = messageUtil.newEmbed()
            .setTitle(titre)
            .setAuthor({ name: dt + " | " + words + " mots", iconURL: "https://i.imgur.com/TYeapMy.png", url: "https://discord.gg/arbnrxWFVu" })
            .setDescription(description)
    
            if(membersUtil.isWeeklyResetTime()){
                await membersUtil.resetAllWeeklyWords()
                await membersUtil.setWeeklyReset()
            }

            if(membersUtil.toMuchWeeklyWords(user.id, words)){
                weekly = membersUtil.getWeeklyWords(user.id)
                await interaction.reply({ content: "**NO !** Pas plus de 20k par semaine bro\nMots : "+words+" | Mots de la semaine : "+weekly+"\nhttps://tenor.com/view/no-chad-giga-chad-giga-chet-gif-25063092", ephemeral: true });

            }else if (words < 1000){

                try{
                    await interaction.reply({ content: "**NO !**  Soit un chad et envoie plus de 1000 mots bro\nMots : "+words+"\nhttps://tenor.com/view/no-chad-giga-chad-giga-chet-gif-25063092", ephemeral: true });
                }catch(Error){
                    member.send("Hhhh... appelle asra, le gars qui s'occupe du bot et dit lui de ma part que ton pdf est bizarre et que j'ai faillit crash... Hhhh... bisou")
                }

            }else{
                exist()
                
                let id1 = 0
                let id2 = 0
                await interaction.reply(dt)
                await interaction.channel.send({ embeds: [messageEmbed]}).then(m => id1 = m.id)
                await interaction.channel.send({ embeds: [fileEmbed], files: [fichier] }).then(m => id2 = m.id)

                //await text.forumPost(dt, fichier, description, dt_auteur, dt_titre)

                await text.save(dt, words, user.id, user.username, id1, id2)

                await membersUtil.addWeeklyWords(user.id,words)
                await membersUtil.addText(user.id, dt)
            }
        }

        pdf(fichier.url).then(function(data) {
            countWords(data.text)    
            send()
            
        })     

	}

}
