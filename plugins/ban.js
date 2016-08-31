module.exports = {
	main: function(bot, message) {
		var banee = message.mentions[0];
		if (bot.memberHasRole(message.author, message.server.roles.get('name', 'Bot Commander'))) {
			try {
				bot.banMember(banee.id, message.server);
				bot.reply(message, ': ' + banee + ' has been banned.');
			} catch (e) {
				console.log(e);
			}

		} else {
			bot.reply(message, ': you do not have the proper roles for this action');
		}

	}
};