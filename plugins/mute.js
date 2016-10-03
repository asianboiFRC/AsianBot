module.exports = {
	main: function(bot, message) {
		var mutee = message.mentions.users.array()[0];
		if (message.member.roles.exists('name', 'Bot Commander')) {
			try {
				var muted = message.guild.members.find('id', mutee.id);
				let role = message.guild.roles.find("name", 'muted');
				muted.addRole(role).catch(console.error);
				message.reply(mutee + ' has been muted.');
				var reason = message.content.split(" ").splice(1).join(" ")
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