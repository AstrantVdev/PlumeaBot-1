module.exports = {
	name: 'ready',
	execute(client) {
		console.log(`PluméaBot pret ! ${client.user.tag}`);
	},
};