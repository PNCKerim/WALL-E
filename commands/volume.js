const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'volume',
	description: 'Change the volume.',
	aliases: ['v', 'vol'],
	usage: '[1-10 or nothing for current volume.]',
	guildOnly: true,
	execute(message, args, ops) {

    if (message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send("Sorry, you aren't connected to the same voice channel");

    var guildIDData = ops.active.get(message.guild.id);
    if (!guildIDData) return message.channel.send("⚠ No music is being played.");
    let clm = (guildIDData.dispatcher.volume * 100)
    if(!args[0]) return message.channel.send(`🎵 Current Volume: **${clm}%**`);

    if (isNaN(args[0]) || args[0] > 10 || args[0] < 0) return message.channel.send("Please give a number between 1-10.");

    guildIDData.dispatcher.setVolume(args[0] / 10);

    let vlm = (args[0] * 10);

    message.channel.send(`🎵 Volume has now been set to ${vlm}%`);

  },
};
