const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const os = require("os");
module.exports = {
  name: 'botinfo',
	description: 'Displays bot information.',
	usage: ' ',
	guildOnly: false,
	execute(message, args) {
    const moment = require("moment");
    require("moment-duration-format");
    const duration = moment.duration(message.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

    const Embed = new MessageEmbed()
      .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
			.setColor("RANDOM")
      .setThumbnail(message.client.user.displayAvatarURL())
      .addField("Bot Name", message.client.user.username + "#" + message.client.user.discriminator)
			.addField("Created On", message.client.user.createdAt)
      .addField("Made By", "KeBiem#5598")
			.addField("Uptime", duration)
      .addField("Invite Link", `[invitelink](${"https://discord.com/oauth2/authorize?client_id=727556137045590077&scope=bot&permissions=8"})`)
			.setTimestamp()
			.setFooter(message.author.username, message.author.displayAvatarURL());

    message.channel.send(Embed);

	},
};
