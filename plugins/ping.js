module.exports = {
	main: function(bot, message) {
		var start = new Date(message.timestamp).getTime();
			bot.sendMessage(message, "Pong!", (error, botMessage) => {
				var end = new Date(botMessage.timestamp).getTime();
				bot.updateMessage(botMessage, "Hello, pong! You're on server **" + message.channel.server.name + "**.\nTook ``" + (end - start) + "`` ms to respond.");
			});
	}
};