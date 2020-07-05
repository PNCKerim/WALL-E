const { MessageEmbed } = require("discord.js");
module.exports = {
	name: 'ban',
	description: 'Ban members.',
	guildOnly: true,
	usage: '[@user] (reason)',
	execute(message, args) {
    let bUser = message.guild.member(message.mentions.users.first());
    if(!bUser) return message.channel.send("Can't find user!");
    let bReason = args.join(" ").slice(22) || "None";
		if (bUser === message.member) return message.channel.send(`You can't ban yourself.`);
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have permission to do that!");
    if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person can't be banned!");

    let banEmbed = new MessageEmbed()
      .setTitle("Ban")
      .setColor("#C30101")
      .addField("Banned User", `${bUser} with ID ${bUser.id}`)
      .addField("Banned By", `${message.author} with ID ${message.author.id}`)
      .addField("Banned In", message.channel)
      .addField("Time", message.createdAt)
      .addField("Reason", bReason);

      let banChannel = message.guild.channels.cache.find(ch => ch.name === 'incidents');
      if(!banChannel) return message.channel.send("Can't find incidents channel");

      message.guild.member(bUser).ban(bReason);
      banChannel.send(banEmbed);
      message.channel.send(`Succesfully banned ${bUser}!`)

	},
};
