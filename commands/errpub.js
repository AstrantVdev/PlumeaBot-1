const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('errpub')
    .setDescription('Ensemble des Commandes relatives aux erreurs de Publication')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption(option => option
        .setName('target')
        .setDescription('Target')
        .setRequired(true))
    .addStringOption(option =>
		option.setName('id0')
			.setDescription('errpub id')
			.setRequired(true)
			.addChoices(
				{ name: 'Determinant', value: '1' },
				{ name: 'Titre', value: '2' },
                { name: 'Mots', value: '3' },
				{ name: 'Synopsis', value: '4' },
				{ name: 'Fichier', value: '5' },
                { name: 'Tout', value: '0' },
			))
    .addStringOption(option =>
        option.setName('id1')
            .setDescription('errpub id1')
            .addChoices(
                { name: 'Determinant', value: '1' },
                { name: 'Titre', value: '2' },
                { name: 'Mots', value: '3' },
                { name: 'Synopsis', value: '4' },
                { name: 'Fichier', value: '5' },
            ))    
    .addStringOption(option =>
		option.setName('id2')
			.setDescription('errpub id2')
			.addChoices(
				{ name: 'Determinant', value: '1' },
				{ name: 'Titre', value: '2' },
                { name: 'Mots', value: '3' },
				{ name: 'Synopsis', value: '4' },
				{ name: 'Fichier', value: '5' },
			))    
    .addStringOption(option =>
		option.setName('id3')
			.setDescription('errpub id3')
			.addChoices(
				{ name: 'Determinant', value: '1' },
				{ name: 'Titre', value: '2' },
                { name: 'Mots', value: '3' },
				{ name: 'Synopsis', value: '4' },
				{ name: 'Fichier', value: '5' },
			)),
	async execute(interaction) {
		var target = interaction.options.getUser('target');
		var id0 = interaction.options.getString('id0');
		var ids = [id0];

		//check is some other ids
		try {
			ids.push(interaction.options.getString('id1'))
		} catch (error) {}
		try {
			ids.push(interaction.options.getString('id2'))
		} catch (error) {}
		try {
			ids.push(interaction.options.getString('id3'))
		} catch (error) {}

		var message = "__**Erreur de publication ! Ton texte a été supprimé pour la raison suivante :**__```md\n";
		
		ids.forEach(element => {
			
			switch (element) {
				case '1':
					message += "#Le Determinant Texte est incorrect, incomplet ou absent.\n";
					break;
				case '2':
					message += "#Le titre de l'œuvre est absent.\n";
					break;
				case '3':
					message += "#Le nombre de mots est absent.\n";
					break;
				case '4':
					message += "#Le synopsis est absent.\n";
					break;
				case '5':
					message += "#Le fichier est au mauvais format (format attendu : .pdf) et/ou le titre du fichier n'est pas le Determinant Texte.\n";
					break;
				case '0':
					message += "#Les publications sur ce serveur sont soumises à des consignes. Elles peuvent être complexes à première vue, mais pas de panique ! Si vous avez besoin d'assistance, n'hésitez pas à solliciter le staff.\n";
					break;
			  }

		});

		message += "```Toutes nos consignes sont disponibles dans les messages épinglés du salon réservé aux posts :D";

		target.send(message).catch(error => {
			interaction.reply({ content: 'Cet utilisateur ne souhaire hélas pas recevoir mes messages ;-;', ephemeral: true });
			return;
		})

		await interaction.reply({ content: 'Action accomplie avec succès ! :D', ephemeral: true });

	},
};