const { MessageEmbed } = require("discord.js");
const rps = ['scissors','rock', 'paper'];
const res = ['Scissors :v:','Rock :fist:', 'Paper :raised_hand:'];

module.exports = {
  name: 'rps',
	description: 'Play a game of rock–paper–scissors against WALL•E!',
	usage: '[rock | paper | scissors]',
	guildOnly: false,
	async execute(message, args) {

    let userChoice = args[0];
    if (!rps.includes(userChoice)) return message.channel.send('Please enter `rock`, `paper`, or `scissors`.');
    userChoice = rps.indexOf(userChoice);

    const botChoice = Math.floor(Math.random()*3);
    let result;
    if (userChoice === botChoice) result = 'It\'s a draw!';
    else if (botChoice > userChoice || botChoice === 0 && userChoice === 2) result = '**WALL•E** wins!';
    else result = `**${message.member.displayName}** wins!`;
    const embed = new MessageEmbed()
      .setTitle(`${message.member.displayName} vs. WALL•E`)
      .addField('Your Choice:', res[userChoice], true)
      .addField('WALL•E\'s Choice', res[botChoice], true)
      .addField('Result', result, true)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL())
      .setTimestamp()
      .setColor("RANDOM");
    message.channel.send(embed);

  },
};
