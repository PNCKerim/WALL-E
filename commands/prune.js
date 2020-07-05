module.exports = {
	name: 'prune',
	description: 'Prune up to 99 messages.',
	aliases: ['clear', 'purge'],
	guildOnly: true,
	usage: '[number 1-99]',
	execute(message, args) {

		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permission to do that!");

		const amount = parseInt(args[0]) + 1;
		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.');
		}

		message.delete().then(() => {
        message.channel
          .bulkDelete(amount)
          .then((messages) => {
            message.channel
              .send(`Cleared ${messages.size} message(s).`)
              .then((botMessage) => {
                setTimeout(function () {
                  botMessage.delete();
                }, 3000);
              });
          })
          .catch(console.error);
      });
	},
};
