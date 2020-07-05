const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
  name: 'dog',
  description: 'Finds a random dog for your viewing pleasure.',
  aliases: ['puppy', 'pup'],
  usage: ' ',
	guildOnly: false,
	async execute(message, args) {

    try {
      const res = await fetch('https://dog.ceo/api/breeds/image/random');
      const img = (await res.json()).message;
      const embed = new MessageEmbed()
        .setTitle('🐶  Woof!  🐶')
        .setImage(img)
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
