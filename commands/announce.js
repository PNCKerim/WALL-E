const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'announce',
	description: 'Announce something to the server.',
	aliases: ['an'],
	usage: '[message]',
	guildOnly: true,
	execute(message, args) {

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have permission to do that!");
    let jw = args.join(" ");
    if(!jw) return;

    const Embed = new MessageEmbed()
      .setTitle("**Announcement**")
      .setColor("#FF0000")
      .setDescription(jw);

      let anChannel = message.guild.channels.cache.find(ch => ch.name === 'announcements');
      if(!anChannel) return message.channel.send("Can't find announcements channel");

      message.delete().catch();
      anChannel.send("@everyone")
      anChannel.send(Embed);




  },
};
