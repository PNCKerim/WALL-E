const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "poll",
  description: "Creates a poll.",
  usage: '[sentence]',
  guildOnly: false,
  execute(message, args) {
    let  pUser  = message.author.username;
    let poll = args.join(" ");
    if(!poll) return message.reply("Invalid Arguments.") || message.channel.send("Invalid Arguments.");

    let pollEmbed = new MessageEmbed()
    .setColor(0xffc300)
    .setTitle("📋 Poll - By @" + pUser)
    .setDescription(poll)
    .setThumbnail(message.author.avatarURL())
    .addField("Key", "👍 = Yes!\n👎 = No!");
    message.channel.send(pollEmbed).then((messageReaction) => {
      messageReaction.react("👍");
      messageReaction.react("👎");
      message.delete({ timeout: 500 }).catch(console.error);
    });
  },
};
