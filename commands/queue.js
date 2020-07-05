const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'queue',
	description: 'Shows the queue.',
	aliases: ['list', 'musiclist', 'songlist', 'q'],
	usage: ' ',
	guildOnly: true,
	async execute(message, args, ops) {
    var guildIDData = ops.active.get(message.guild.id);

    // Nakijken als er al liedjes gepsleet worden in deze server.
    if (!guildIDData) return message.channel.send("⚠ No music is being played.");

    // Data ophalen.
    var queue = guildIDData.queue;
    var nowPlaying = queue[0];


    var response = `🎵 **${nowPlaying.songTitle}** is now being played. \n\n**-=- Music Queue -=-** \n`;


    for (var i = 0; i < queue.length; i++) {

        response += `${i} - **${queue[i].songTitle}** | Requested By: **${queue[i].requester}**\n`;

    }

    // Zenden van het bericht.
    message.channel.send(response);


  },
};
