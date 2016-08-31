module.exports = {
	main: function(bot, message) {
		bot.sendMessage(message, "Stats for ASIANBOT: \n``" + bot.users.length + " Users\n" + bot.channels.length + " Channels\n" + bot.servers.length + " Servers``");
	}
};