const { MessageEmbed } = require("discord.js");
const urban = require("urban");
const { stripIndents } = require("common-tags")
module.exports = {
	name: 'urban',
	description: 'Search something on the Urban Dictionary.',
	usage: '[search] or keep empty for random.',
  aliases: ['ur'],
	guildOnly: false,
	execute(message, args) {
    
    let image = "https://pbs.twimg.com/profile_images/592612052855869440/rCFhvAjK_400x400.jpg";
    let search = args[0] ? urban(args.slice(0).join(" ")) : urban.random() || "random"
      try {
        search.first(res => {
          if(!res) return message.channel.send("No results found for this topic, sorry!")
          let { word, definition, example, thumbs_up, thumbs_down, permalink, author} = res

          let Embed = new MessageEmbed()
            .setAuthor(`Urban Dictionary | ${word}`, image)
            .setColor("#1D2439")
            .setThumbnail(image)
            .setDescription(stripIndents`**Definition** ${definition || "No definition"}
            **Example** ${example || "No Example"}
            **Upvote:** ${thumbs_up || 0}
            **Downvote:** ${thumbs_down || 0}
            **Link:** [link to ${word}](${permalink || "https://www.urbandictionary.com/"})
            **Written by** ${author || "unknown"}`)
            .setTimestamp()
            .setFooter(message.author.username, message.author.displayAvatarURL());

            message.channel.send(Embed);
        })
      } catch(e) {
        console.log(e)
        return message.channel.send("Turkish quality bot :(");
      }


	},
};
