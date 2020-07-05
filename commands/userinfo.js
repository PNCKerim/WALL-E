const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'userinfo',
	description: 'Displays user information.',
  aliases: ['u'],
  guildOnly: true,
  usage: '(@user)',
	execute(message, args) {

    let user = message.mentions.users.first() || message.author;
    const member = message.guild.member(user);

    const Embed = new MessageEmbed()
      .setAuthor(user.username, user.displayAvatarURL())
			.setColor("RANDOM")
      .setThumbnail(user.displayAvatarURL())
      .addField("ID", user.id)
			.addField("Joined On", member.joinedAt)
      .addField("Account Created", user.createdAt)
			.addField("All Roles", member.roles.cache.map(x => x.toString()))
			.setTimestamp()
			.setFooter(message.author.username, message.author.displayAvatarURL());

      message.channel.send(Embed);

	},
};
