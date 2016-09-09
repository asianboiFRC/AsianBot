module.exports = {
	main: function(bot, message) {
		var mutee = message.mentions.users.array()[0];
		message.channel.sendMessage('Mute is broken right now!');
		return;
		if (message.member.roles.exists('name', 'Bot Commander')) {
			try {
				var roles = message.member.roles.array();
				roles.push(message.guild.roles.find('name', 'muted'))
				message.member.setRoles(roles)
				message.reply(mutee + ' has been muted.');
				var reason = message.content.split(" ").splice(2).join(" ")
				try{
					var log = message.guild.channels.find('name', 'mod-log');
					log.sendMessage("ACTION: MUTE\nUSER: " + mutee.username + "\nReason: " + reason + "\nModerator: " + message.author.username);
				}
				catch (e) {
					console.log(e);
					message.channel.sendMessage('Make a channel called #mod-log.');
					message.channel.sendMessage("ACTION: MUTE\nUSER: " + mutee.username + "\nReason: " + reason + "\nModerator: " + message.author.username);
				}
			} catch (e) {
				console.log(e);
				message.channel.sendMessage('Muted Role does not exist');
			}
		} else {
            message.reply("You don't have permission to do this.");
        }
	}
};