const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'skip',
	description: 'Skip a song.',
	aliases: ['sk'],
	usage: ' ',
	guildOnly: true,
	execute(message, args, ops) {
    var guildIDData = ops.active.get(message.guild.id);

    // Nakijken als er al liedjes gepsleet worden in deze server.
    if (!guildIDData) return message.channel.send("⚠ No music is being played.");

    // Nakijken als in zelfde kanaal zit als de bot.
    if (message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send("Sorry, you aren't connected to the same voice channel");

    ops.active.set(message.guild.id, guildIDData);

    if (guildIDData.queue[0]) {
       guildIDData.dispatcher.end();
       message.channel.send("🎵 Skipping the song!");

    }



  },
};
