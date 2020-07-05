const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
  name: 'thouart',
	description: 'Says a random Elizabethan insult to the mentioned user (or you, if no user is mentioned).',
	aliases: ['elizabethan', 'ta'],
	usage: '(@user)',
	guildOnly: false,
	async execute(message, args) {
    const member =  message.mentions.users.first() || message.member;
    try {
      const res = await fetch('http://quandyfactory.com/insult/json/');
      let insult = (await res.json()).insult;
      insult = insult.charAt(0).toLowerCase() + insult.slice(1);
      const embed = new MessageEmbed()
        .setTitle('🎭  Thou Art  🎭')
        .setDescription(`${member}, ${insult}`)
        .setFooter(message.author.username, message.author.displayAvatarURL())
        .setTimestamp()
        .setColor("RANDOM");
      message.channel.send(embed);

    } catch (err) {
      console.log(err);
      message.channel.send('Something went wrong. Please try again in a few seconds.');
    }

  },
};
