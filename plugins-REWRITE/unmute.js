module.exports = {
	main: function(bot, msg) {
		var mutee = msg.mentions[0];
		if (bot.memberHasRole(msg.author, msg.server.roles.get('name', 'Bot Commander')) || isCommander.indexOf(message.sender.id) > -1) {
			try {
				bot.removeMemberFromRole(mutee.id, msg.server.roles.get('name', 'muted'));
				bot.reply(msg, mutee + ' has been unmuted.');
			} catch (e) {
				bot.sendMessage(msg, 'Muted Role does not exist');
			}
		} else {
			bot.reply(msg, 'you do not have permission to do this action');
		}
	}
};