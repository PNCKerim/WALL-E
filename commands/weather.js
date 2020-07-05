const { MessageEmbed } = require("discord.js");
const weather = require('weather-js');

module.exports = {
  name: 'weather',
	description: 'Gives weather at a location.',
	aliases: ['w'],
	usage: '[location]',
	guildOnly: false,
	execute(message, args) {

    let  plek =args.slice(0).join(" ");
    if(!plek) return message.channel.send("Give a location.");

    weather.find({search: plek, degreeType: 'C'}, function(err, result) {
  if(err) console.log(err);

  var current = result[0].current;
  var location = result[0].location;

    let wEmbed = new MessageEmbed()
    	.setAuthor(`Weather for ${current.observationpoint}`)
    	.setColor("#3734eb")
      .setDescription(`**${current.skytext}**`)
    	.setThumbnail(current.imageUrl)
    	.addField("Timezone", `UTC${location.timezone}`, true)
      .addField("Degree Type", location.degreetype, true)
      .addField("Temperature", `${current.temperature} Degrees`, true)
      .addField("Feels like", `${current.feelslike} Degrees`, true)
      .addField("Winds", current.winddisplay, true)
      .addField("Humidity", `${current.humidity}%`, true)
    	.setTimestamp()
    	.setFooter(message.author.username, message.author.displayAvatarURL());

    	message.channel.send(wEmbed);
});
  },
};
