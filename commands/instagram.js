const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const fetch = require("node-fetch");

module.exports = {
  name: 'instagram',
	description: 'Find out some nice instagram statistics.',
	aliases: ['insta'],
	usage: '[name]',
	guildOnly: false,
  async execute(message, args) {
    const name = args[0];

        if (!name) {
            return message.reply("Maybe it's useful to actually search for someone...!")
                .then(m => m.delete(5000));
        }

        const url = `https://instagram.com/${name}/?__a=1`;

        

      
         const res = await fetch(url).then(url => url.json());
       
      
       
        const account = res.graphql.user;

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(account.full_name)
            .setURL(`https://instagram.com/${name}`)
            .setThumbnail(account.profile_pic_url_hd)
            .addField("Profile information", stripIndents`**- Username:** ${account.username}
            **- Full name:** ${account.full_name}
            **- Biography:** ${account.biography.length == 0 ? "none" : account.biography}
            **- Posts:** ${account.edge_owner_to_timeline_media.count}
            **- Followers:** ${account.edge_followed_by.count}
            **- Following:** ${account.edge_follow.count}
            **- Private account:** ${account.is_private ? "Yes 🔐" : "Nope 🔓"}`)
            .setTimestamp()
      			.setFooter(message.author.username, message.author.displayAvatarURL());

        message.channel.send(embed);

  },
};
