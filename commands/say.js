const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'say',
	description: 'Let the bot say something.',
	usage: '[message]',
	guildOnly: false,
	execute(message, args) {
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permission to do that!");

    let botmessage = args.join(" ");
    message.delete().catch();
    message.channel.send(botmessage);
	},
};
