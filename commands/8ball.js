const { MessageEmbed } = require("discord.js");
module.exports = {
	name: '8ball',
	description: 'There is a big chance I insult you!',
	usage: '[question]',
	guildOnly: false,
	execute(message, args) {

		if(!args[2]) return message.reply("Please ask a full question!")
		let responses = [
			"Yes",
			"No",
			"Definetly",
			"Absoloutely",
			"Not in a million years",
		];

		let response = responses[Math.floor(Math.random() * responses.length)];
		let question = args.slice(0).join(" ");

		let Embed = new MessageEmbed()
					.setTitle(`8Ball!`)
					.setDescription(message.author.tag)
					.addField("Question", question)
					.addField("Answer", response)
					.setColor(`RANDOM`);
				message.channel.send(Embed);
		}
};
