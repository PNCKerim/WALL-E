const { MessageEmbed } = require("discord.js");
const ft = require('fortnite');
const fortnite = new ft(process.env.FOLINE);

module.exports = {
  name: 'fortnite',
	description: 'Displays fortnite information.',
	aliases: ['f'],
	usage: '[username] [pc | xbl | psn] default PSN',
	guildOnly: false,
	execute(message, args) {

    let uName = args[0];
    if(!uName) return message.channel.send("Give an username!");
    let platform = args[1] || "psn";


    fortnite.user(uName, platform).then(data => {
      var dat = data.stats.lifetime;

      const Embed = new MessageEmbed()
        .setAuthor(data.username)
        .setTitle("Fortnite Tracker Lifetime Stats")
  			.setColor("#03d7fc")
        .setThumbnail("https://assets.pinshape.com/uploads/image/file/241862/container_fortnite-logo-key-ring-3d-printing-241862.jpg")
        .addField("Wins", dat.wins, true)
  			.addField("Kills", dat.kills, true)
        .addField("Score", dat.score, true)
        .addField("Kill/Death Ratio", dat.kd, true)
  			.addField("Matches Played", dat.matches, true)
  			.setTimestamp()
  			.setFooter(message.author.username, message.author.displayAvatarURL());

        message.channel.send(Embed);

    }).catch(err => {
      console.log(err);
      message.channel.send("No data found.");
    });

  },
};
