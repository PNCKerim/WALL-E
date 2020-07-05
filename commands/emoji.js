const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'emoji',
	description: 'Displays a list of all current emojis.',
	usage: ' ',
	guildOnly: true,
	execute(message, args) {
    const emojis = message.guild.emojis.cache;
    let emojiList = '';
    emojis.forEach(e => { emojiList = emojiList + `${e} :${e.name}: \n`; });
    const embed = new Discord.MessageEmbed()
      .setTitle('Emoji List')
      .setColor("#FCD314");
    while (emojiList.length > 2048) { // Description is capped at 2048 chars
      emojiList = emojiList.substring(0, emojiList.lastIndexOf('\n') -2);
      const count = emojiList.split('\n').length;
      embed.setFooter(`Only ${count} of ${emojis.size} emojis could be displayed`);
    }
    embed.setDescription(emojiList);
    message.channel.send(embed);

  },
};
