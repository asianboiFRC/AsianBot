module.exports = {
	main: function(bot, message) {
		var config = require('../config.json');
		var isCommander = config.admins;
		
		var kickee = message.mentions.users.array()[0];
		if (message.member.roles.exists('name', 'Bot Commander') || isCommander.indexOf(message.author.id) > -1) {
			try {
				var kicked = message.guild.members.find('id', kickee.id);
				kicked.kick();
				message.channel.sendMessage(kickee + ' has been kicked.');
				var reason = message.content.split(" ").splice(1).join(" ")
				try{
					var log = message.guild.channels.find('name', 'mod-log');
					message.channel.sendMessage("ACTION: KICK\nUSER: " + kickee.username + "\nReason: " + reason + "\nModerator: " + message.author.username);
				}
				catch (e) {
					console.log(e);
					message.channel.sendMessage('Make a channel called #mod-log.');
					message.channel.sendMessage("ACTION: KICK\nUSER: " + kickee.username + "\nReason: " + reason + "\nModerator: " + message.author.username);
				}
			} catch (e) {
				console.log(e);
			}
		} else {
			bot.reply(message, ': you do not have the proper roles for this action');
		}
	}
};