const Discord = require("discord.js");
const rgx = /^(?:<@!?)?(\d+)>?$/;

module.exports = {
  name: 'unban',
	description: 'Unbans a member from your server.',
	usage: '[user id] (reason)',
	guildOnly: true,
	async execute(message, args) {

    let ubUser = args[0];
    if (isNaN(ubUser)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		}
    if(!ubUser) return message.channel.send("Can't find user!");
    let reason = args.join(" ").slice(22) || "None";
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have permission to do that!");

    let unbanChannel = message.guild.channels.cache.find(ch => ch.name === 'incidents');
    if(!unbanChannel) return message.channel.send("Can't find incidents channel");
      const embed = new Discord.MessageEmbed()
        .setTitle("Unban")
        .setColor("#F7F7FF")
        .addField("Unbanned User", `<@${ubUser}> with ID ${ubUser}`)
        .addField("Unbanned By", `${message.author} with ID ${message.author.id}`)
        .addField("Unbanned In", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", reason);

        message.guild.members.unban(ubUser, reason).catch(error => console.log(error));

      message.channel.send(`Succesfully unbanned <@${ubUser}>!`)
      unbanChannel.send(embed).catch(err => console.log(err));
  },
};
