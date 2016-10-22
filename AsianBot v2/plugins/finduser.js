module.exports = {
	main: function(bot, message) {
		var config = require('../config.json');
		var isCommander = config.admins;
		if (isCommander.indexOf(message.author.id) > -1) {
			var user = message.mentions.users.array()[0];
			bot.guilds.forEach(guild => {
				if (guild.members.exists('id', user.id)) 
						message.channel.sendMessage(guild.name) 
			});
		}
	}
};