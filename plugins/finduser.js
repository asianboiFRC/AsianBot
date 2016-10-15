module.exports = {
	main: function(bot, message) {
		var user = message.mentions.users.array()[0];
		bot.guilds.forEach(guild => {
			if (guild.members.exists('id', user.id)) 
					message.channel.sendMessage(guild.name) 
		});
	}
};