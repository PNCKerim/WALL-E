const { MessageEmbed } = require("discord.js");
const art = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
  'https://lh3.googleusercontent.com/proxy/iaORMYLICxai8nw7BqpURX0Bfm-OVt0cItaUP4SQcOZRFUNJplOOWPyb4VjVTC63UyzpVEcjn5iqXZ4yeIXVZhcF9ypZNhOR24vRbA7zg5qzPzIFR3goeQSkztutRIGntPadn2HF4zfcVo74hKmmYCEEdMt3KUpb',
  'https://www.kunstuitleengouda.nl/im9/998248.jpg',
  'https://www.alletop10lijstjes.nl/wp-content/uploads/2017/02/Compositie-2-in-Rood-Blauw-en-Geel.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_HD.jpg/1200px-The_Night_Watch_-_HD.jpg',
  'https://img.itinari.com/pages/images/original/5237c524-d1db-4049-b929-184ca846d256-7227.jpg?ch=DPR&dpr=1&w=1200&h=800&s=b5dac717dd75d44ac8ee9e6709de8c49',
  'https://www.rene-magritte.com/The%20Son%20of%20Man%20Rene%20Magritte.jpg',
  'https://bvtheorie.files.wordpress.com/2014/02/picasso_the_weeping_woman_tate_identifier_t05010_10.jpg',
  'https://kunstblik.files.wordpress.com/2014/05/canon-dali-persistance.jpg'
];

module.exports = {
  name: 'gallery',
	description: 'Displays art.',
	aliases: ['art'],
	usage: ' ',
	guildOnly: false,
	async execute(message, args) {
    let n = 0;
    const back = '⬅';
    const next = '➡';
    const embed = new MessageEmbed()
      .setTitle('Art Gallery')
      .setImage(art[n])
      .setFooter('SO to Mrs. Schouten (CKV).\nGallery expires after 3 minutes.')
      .setColor("RANDOM");
    const msg = await message.channel.send(embed);
    await msg.react(back);
    await msg.react(next);
    const filter = (reaction, user) => user != message.client.user;
    const collector = msg.createReactionCollector(filter, { time: 180000 }); // Three minute timer
    collector.on('collect', async reaction => {
      const reactionUsers = (await reaction.users.fetch()).filter(user=> user != message.client.user);
      reactionUsers.forEach(async user => await reaction.users.remove(user));
      if (reaction.emoji.name === back){
        n--;
        if (n < 0) n = art.length - 1;
      } else if (reaction.emoji.name === next){
        n++;
        if (n > art.length - 1) n = 0;
      }
      embed.setImage(art[n]);
      await msg.edit(embed);
    });
    collector.on('end', async () => {
      await msg.edit(new MessageEmbed()
        .setTitle('Art Gallery')
        .setDescription('Sorry! The gallery has expired.')
        .setColor("RANDOM")
      );
      await msg.reactions.removeAll();
    });



  },
};
