module.exports = {
	main: function(bot, message) {
		var version = "1.6"
		var whatsnew = "Rewrite!"
		bot.sendMessage(message, "ASIANBOT " + version + ": " + whatsnew);
	}
};