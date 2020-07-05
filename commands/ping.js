module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 10,
	usage: ' ',
	guildOnly: false,
	execute(message, args) {
		message.channel.send('Pong.');
	},
};
