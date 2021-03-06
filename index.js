const fs = require('fs');
const Discord = require('discord.js');
// const { prefix, token } = require('./config.json');

const ytdl = require('ytdl-core');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const active = new Map();

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	console.log('WALL•E is online!');
	client.user.setActivity('WALL•E', { type: 'WATCHING' });
});

client.on('guildMemberAdd', async member => {
	let welcomechannel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
	let gMembed =  new Discord.MessageEmbed()
		.setDescription(`**${member} just joined. Everyone, look busy!**`)
		.setColor('#19ADBD');
	welcomechannel.send(gMembed);
	const role = member.guild.roles.cache.find(role => role.name === 'Common');
	member.roles.add(role);
});

client.on('guildMemberRemove', async member => {
	let welcomechannel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
	let geMembed =  new Discord.MessageEmbed()
		.setDescription(`**Roses are red, violets are blue, ${member} left, what did we do?**`)
		.setColor('#FF0000');
	welcomechannel.send(geMembed);
});

client.on('message', async message => {
	if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

	const args = message.content.slice(process.env.PREFIX.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${process.env.PREFIX}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 0)* 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


	try {

		let ops = {
			active: active
		}

		command.execute(message, args, ops);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}


});

client.login(process.env.TOKEN);
