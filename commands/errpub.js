const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
	.setName("errpub")
    .setDescription("Ensemble des Commandes relatives aux erreurs de Publication")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption(option => option
        .setName("target")
        .setDescription("Target")
        .setRequired(true))
    .addStringOption(option =>
		option.setName("id0")
			.setDescription("errpub id")
			.setRequired(true)
			.addChoices(
				{ name: "Mauvaise série", value: "1" },
                { name: "Biensceance", value: "2" },
                { name: "Copyright", value: "3" },
				{ name: "Mauvais Auteur", value: "4" },
				{ name: "Fanfiction ", value: "5" },
				{ name: "Non-fiction", value: "6" }
			))
    .addStringOption(option =>
        option.setName("id1")
            .setDescription("errpub id1")
            .addChoices(
				{ name: "Mauvaise série", value: "1" },
                { name: "Biensceance", value: "2" },
                { name: "Copyright", value: "3" },
				{ name: "Mauvais Auteur", value: "4" },
				{ name: "Fanfiction ", value: "5" },
				{ name: "Non-fiction", value: "6" }
            ))    
    .addStringOption(option =>
		option.setName("id2")
			.setDescription("errpub id2")
			.addChoices(
				{ name: "Mauvaise série", value: "1" },
                { name: "Biensceance", value: "2" },
                { name: "Copyright", value: "3" },
				{ name: "Mauvais Auteur", value: "4" },
				{ name: "Fanfiction ", value: "5" },
				{ name: "Non-fiction", value: "6" }
			))
	.addStringOption(option =>
		option.setName("id3")
			.setDescription("errpub id3")
			.addChoices(
				{ name: "Mauvaise série", value: "1" },
                { name: "Biensceance", value: "2" },
                { name: "Copyright", value: "3" },
				{ name: "Mauvais Auteur", value: "4" },
				{ name: "Fanfiction ", value: "5" },
				{ name: "Non-fiction", value: "6" }
			))
	.addStringOption(option =>
		option.setName("id4")
			.setDescription("errpub id4")
			.addChoices(
				{ name: "Mauvaise série", value: "1" },
                { name: "Biensceance", value: "2" },
                { name: "Copyright", value: "3" },
				{ name: "Mauvais Auteur", value: "4" },
				{ name: "Fanfiction ", value: "5" },
				{ name: "Non-fiction", value: "6" }
			))
	.addStringOption(option =>
		option.setName("id5")
			.setDescription("errpub id5")
			.addChoices(
				{ name: "Mauvaise série", value: "1" },
                { name: "Biensceance", value: "2" },
                { name: "Copyright", value: "3" },
				{ name: "Mauvais Auteur", value: "4" },
				{ name: "Fanfiction ", value: "5" },
				{ name: "Non-fiction", value: "6" }
			)),
	async execute(interaction) {
		var target = interaction.options.getUser("target");
		var id0 = interaction.options.getString("id0");
		var ids = [id0];

		//check is some other ids
		try {
			ids.push(interaction.options.getString("id1"))
		} catch (error) {}
		try {
			ids.push(interaction.options.getString("id2"))
		} catch (error) {}
		try {
			ids.push(interaction.options.getString("id3"))
		} catch (error) {}
		try {
			ids.push(interaction.options.getString("id4"))
		} catch (error) {}
		try {
			ids.push(interaction.options.getString("id5"))
		} catch (error) {}

		var message = "__**Erreur de publication ! Ton texte a été supprimé pour la raison suivante :**__```md\n";
		
		ids.forEach(element => {
			
			switch (element) {
				case "1":
					message += "#Le dt_titre n'est pas similaire à la série dont il appartient.\n";
					break;
				case "2":
					message += "#Ton texte enfreint les règles de la communauté.\n";
					break;
				case "3":
					message += "#Ton texte est une fanfiction. Il contient un matériel source étranger au serveur, copyrighté et non original, et donc par conséquent ne peut pas être commenté par tous. Désolé!\n";
					break;
				case "4":
					message += "#Ton texte porte le dt_auteur d'un autre membre\n";
					break;				
				case "5":
					message += "#Ton texte est une fanfiction. Compte tenu que tout le monde n'a pas accès au matériaux de base sur lequel se base ton histoire. Ton texte a été retiré, désolé!\n";
					break;				
				case "6":
					message += "#Ton texte n'est pas de la fiction. Nous n'acceptons pas les essais ou biographies car ils sont par essences difficilement critiquables. Ton texte a été retiré, désolé!\n";
					break;
				case "0":
					message += "#Les publications sur ce serveur sont soumises à des consignes. Elles peuvent être complexes à première vue, mais pas de panique ! Si vous avez besoin d'assistance, n'hésitez pas à solliciter le staff.\n";
					break;
			  }

		});

		message += "```Toutes nos consignes sont disponibles dans les messages épinglés du salon réservé aux posts :D";

		target.send(message).catch(error => {
			interaction.reply({ content: "Cet utilisateur ne souhaire hélas pas recevoir mes messages ;-;", ephemeral: true });
			return;
		})

		await interaction.reply({ content: "Action accomplie avec succès ! :D", ephemeral: true });

	}

}
