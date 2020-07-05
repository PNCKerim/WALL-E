const { MessageEmbed } = require("discord.js");
const encode = require('strict-uri-encode');

module.exports = {
  name: 'lmgtfy',
	description: 'Tell someone to just google it!',
	aliases: ['g', 'lmg'],
	usage: '[search]',
	guildOnly: false,
	execute(message, args) {

    let searcht = encode(args.join(" "));
    if(!searcht) return message.channel.send("Send a search term.");

    let link = `https://www.lmgtfy.com/?q=${searcht}`;

    message.channel.send(`**<${link}>**`);

  },
};
