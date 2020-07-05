const { MessageEmbed } = require("discord.js");
const ytdl = require('ytdl-core');

module.exports = {
  name: 'leave',
	description: 'Bot stops playing music & leaves voice channel.',
	aliases: ['stop', 'l'],
	usage: ' ',
	guildOnly: true,
	async execute(message, args, ops) {

    if(!message.member.voice.channel) return message.channel.send("Please, connect to a voice channel.");
    if(!message.guild.me.voice.channel) return message.channel.send("Sorry, the bot isn't connected to a voice channel.");
    if(message.guild.me.voice.channel.id != message.member.voice.channel.id) return message.channel.send("Sorry, you aren't connected to the same voice channel");

    var guildIDData = ops.active.get(message.guild.id);
    ops.active.set(message.guild.id, guildIDData);

    if(guildIDData.queue){
      for(i = guildIDData.queue.length -1; i >=0; i--){
        guildIDData.queue.splice(i, 1)
      }
      guildIDData.dispatcher.end();
    }

    message.guild.me.voice.channel.leave();
    message.channel.send("🎵 Leaving channel...")



  },
};
