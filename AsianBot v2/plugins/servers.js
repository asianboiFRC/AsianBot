module.exports = {
	main: function(bot, message) {
		message.channel.sendMessage("Servers: " + bot.guilds.size);
	}
};