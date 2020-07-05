const { MessageEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports = {
  name: 'meme',
	description: 'Sends an epic meme.',
	usage: ' ',
	guildOnly: false,
	async execute(message, args) {
    const subReddits = ["dankmeme", "meme", "me_irl"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];

    const img = await randomPuppy(random);
    const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setImage(img)
        .setTitle(`From /r/${random}`)
        .setURL(`https://reddit.com/r/${random}`)
        .setTimestamp()
    		.setFooter(message.author.username, message.author.displayAvatarURL());  

        message.channel.send(embed);
  },
};
