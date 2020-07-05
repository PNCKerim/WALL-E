const { MessageEmbed } = require("discord.js");
module.exports = {
	name: 'kick',
	description: 'Kick members.',
	guildOnly: true,
	usage: '[@user] (reason)',
	execute(message, args) {
    let kUser = message.guild.member(message.mentions.users.first());
    if(!kUser) return message.channel.send("Can't find user!");
		if (kUser === message.member) return message.channel.send(`You can't kick yourself.`);
    let kReason = args.join(" ").slice(22) || "None";
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You do not have permission to do that!");
    if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new MessageEmbed()
      .setTitle("Kick")
      .setColor("#e56b00")
      .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
      .addField("Kicked By", `${message.author} with ID ${message.author.id}`)
      .addField("Kicked In", message.channel)
      .addField("Time", message.createdAt)
      .addField("Reason", kReason);

      let kickChannel = message.guild.channels.cache.find(ch => ch.name === 'incidents');
      if(!kickChannel) return message.channel.send("Can't find incidents channel");

      message.guild.member(kUser).kick(kReason);
      kickChannel.send(kickEmbed);
      message.channel.send(`Succesfully kicked ${kUser}!`)
	},
};
