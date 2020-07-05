const { MessageEmbed, client } = require("discord.js");
const ytdl = require('ytdl-core');
const yts = require('yt-search');
// const Discord.Client() = require("discord.js");

module.exports = {
  name: 'play',
	description: 'Play a song.',
	aliases: ['p', 'join'],
	usage: '[search || url]',
	guildOnly: true,
	async execute(message, args, ops) {


    if(!message.member.voice.channel) return message.channel.send("please join a voice channel!");
    let filmpje = args.join(" ")
    if(!filmpje) return message.channel.send("Please enter a search term or url!");
    yts(filmpje, async function ( err, r ) {
      const videos = r.videos;
      const filmpjes = videos[0].url;

      var info = await ytdl.getInfo(filmpjes);

    let data = ops.active.get(message.guild.id) || {};
    if(!data.connection) data.connection = await message.member.voice.channel.join();
    if(!data.queue) data.queue = [];
    data.guildID = message.guild.id;

    data.queue.push({
      songTitle: info.title,
      requester: message.author.tag,
      url: filmpjes,
      announceChannel: message.channel.id
    });


    if(!data.dispatcher) play(message, ops, data);
    else {

      message.channel.send(`🎵 **${info.title}** has been added to queue.`);
    }

    ops.active.set(message.guild.id, data);

      } )

  },
};


async function play(message, ops, data){
  message.client.channels.cache.get(data.queue[0].announceChannel).send(`🎵 **${data.queue[0].songTitle}** is now being played.`);

  var optionss = { volume: 0.5 };

  data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, { filter: "audioonly" }), optionss);
  data.dispatcher.guildID = data.guildID;

  data.dispatcher.once('finish', function() {
    finish(message, ops, this)
  })
}

function finish(message, ops, dispatcher) {

  let fetched = ops.active.get(dispatcher.guildID);
  fetched.queue.shift();

  if(fetched.queue.length > 0) {
    ops.active.set(dispatcher.guildID, fetched);

    play(message, ops, fetched)
  } else {
    ops.active.delete(dispatcher.guildID);


    let vc = message.client.guilds.cache.get(dispatcher.guildID).me.voice.channel;
    if (vc) vc.leave();
  }
}
