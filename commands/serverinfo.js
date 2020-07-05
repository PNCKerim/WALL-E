const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'serverinfo',
	description: 'Displays server information.',
	usage: ' ',
	guildOnly: true,
	execute(message) {

	message.guild.members.fetch().then(fetchedMembers => {
	const totalOnline = fetchedMembers.filter(member => member.presence.status === 'online');

    const Embed = new MessageEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL())
			.setColor("RANDOM")
      .setThumbnail(message.guild.iconURL())
      .addField("Owner", `<@${message.guild.ownerID}>`)
			.addField("Server ID", message.guild.id)
      .addField("Region", message.guild.region)
			.addField("Created On", message.guild.createdAt)
      .addField("Members (Online)", `${message.guild.memberCount} - **${totalOnline.size} online**`)
			.setTimestamp()
			.setFooter(message.author.username, message.author.displayAvatarURL());

    message.channel.send(Embed);
		});
	},
};
