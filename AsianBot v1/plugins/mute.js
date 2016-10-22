module.exports = {
	main: function(bot, message) {
		var mutee = message.mentions[0];
		if (bot.memberHasRole(message.author, message.server.roles.get('name', 'Bot Commander'))) {
			try {
				bot.addMemberToRole(mutee, message.server.roles.get('name', 'muted'));
				bot.reply(message, mutee + ' has been muted.');
				var reason = message.content.split(" ").splice(2).join(" ")
				bot.sendMessage(message, "ACTION: MUTE\nUSER: " + mutee.username + "\nReason: " + reason + "\nModerator: " + message.author.username);
			} catch (e) {
				console.log(e);
				bot.sendMessage(message, 'Muted Role does not exist');
			}
		} else {
            bot.reply(message, "You don't have permission to do this.");
        }
	}
};