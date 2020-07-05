const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'dice',
	description: 'Rolls a dice with the specified number of sides. Will default to 6 sides if no number is given.',
	usage: '(dice sides)',
	guildOnly: false,
	execute(message, args) {
    let limit = args[0];
    if (!limit) limit = 6;
    const n = Math.floor(Math.random() * limit + 1);
    if (!n || limit <= 0) return message.channel.send('Invalid argument. Please specify the number of dice sides.');
    const embed = new MessageEmbed()
      .setTitle('🎲  Dice Roll  🎲')
      .setDescription(`${message.member}, you rolled a **${n}**!`)
      .setFooter(message.author.username, message.author.displayAvatarURL())
      .setTimestamp()
      .setColor("RANDOM");
    message.channel.send(embed);

  },
};
