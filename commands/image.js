const { MessageEmbed } = require("discord.js");
const cheerio = require('cheerio');
const request = require('request');

module.exports = {
  name: 'image',
	description: 'Gives weather at a location.',
	aliases: ['img', 'im'],
	usage: '[term] or keep empty for random.',
	guildOnly: false,
	execute(message, args) {

    let search = args.slice(0).join(" ") || "random";
    if(!search) return message.channel.send("Send a search term.");

    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + search,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };


    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }

        $ = cheerio.load(responseBody);

        var links = $(".image a.link");

        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

        if (!urls.length) {

            return;
        }

        // Send result
        message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
      });
  },

};
