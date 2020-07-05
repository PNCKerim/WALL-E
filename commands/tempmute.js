const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
	name: 'tempmute',
	description: 'Mute a persoon.',
	aliases: ["mute"],
	guildOnly: true,
	usage: '[@user] [time] (reason)',
	execute(message, args) {

    let mUser = message.guild.member(message.mentions.users.first());
    if(!mUser) return message.channel.send("Can't find user!");

    let mRole = message.guild.roles.cache.find(ch => ch.name === 'Muted');
    if(!mRole) return message.channel.send("Can't find **Muted** role!");

    let time = args[1];
    if(!time) return message.channel.send("Specify Time!")

    let mReason = args.slice(2).join(" ");


    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permission to do that!");
    if(mUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be muted!");

    let muteEmbed = new MessageEmbed()
      .setTitle("Muted")
      .setColor("#F7F7FF")
      .addField("Muted User", `${mUser} with ID ${mUser.id}`)
      .addField("Muted By", `${message.author} with ID ${message.author.id}`)
      .addField("Muted Time", `${time}`)
      .addField("Muted In", message.channel)
      .addField("Time", message.createdAt)
      .addField("Reason", mReason || "None");

      let muteChannel = message.guild.channels.cache.find(ch => ch.name === 'incidents');
      if(!muteChannel) return message.channel.send("Can't find incidents channel");

      mUser.roles.add(mRole)
      muteChannel.send(muteEmbed);
      message.channel.send(`Succesfully muted ${mUser} for ${time}!`);

      setTimeout(function() {
        mUser.roles.remove(mRole);
        message.channel.send(`Succesfully unmuted ${mUser}`);
      }, ms(time))
  }
};
