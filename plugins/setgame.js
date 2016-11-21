module.exports = {
	main: function(bot, message) {
		var game = message.content.split(" ").splice(1).join(" ");
        bot.setPlayingGame(game);
        bot.reply(message, "Successfully set game to " + game);
	}
};