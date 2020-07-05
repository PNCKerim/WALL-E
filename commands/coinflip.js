const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'coinflip',
	description: 'Flips a coin.',
	aliases: ['cointoss', 'coin', 'flip'],
	usage: ' ',
	guildOnly: false,
	execute(message, args) {
    const n = Math.floor(Math.random() * 2);
    let result;
    if (n === 1) result = 'heads';
    else result = 'tails';
    const embed = new MessageEmbed()
      .setTitle('🤔  Coinflip  🤔')
      .setDescription(`I flipped a coin for you, ${message.member}. It was **${result}**!`)
      .setFooter(message.author.username, message.author.displayAvatarURL())
      .setTimestamp()
      .setColor("#FCD314");
    message.channel.send(embed);

  },
};
