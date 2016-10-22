module.exports = {
	main: function(bot, message) {
		bot.sendMessage(message, "Servers: " + bot.servers.length);
	}
};