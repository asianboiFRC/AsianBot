module.exports = {
	main: function(bot, message) {
		var banee = message.mentions.users.array()[0];
		if (message.member.roles.exists('name', 'Bot Commander')) {
			try {
				var banned = message.guild.members.get(banee.id);
				banned.ban();
				message.reply(banee + ' has been banned.');
				var reason = message.content.split(" ").splice(1).join(" ")
				message.channel.sendMessage("ACTION: BAN\nUSER: " + banned.username + "\nReason: " + reason + "\nModerator: " + message.author.username);
			} catch (e) {
				console.log(e);
			}
		} else {
			message.reply(': you do not have the proper roles for this action');
		}
	}
};