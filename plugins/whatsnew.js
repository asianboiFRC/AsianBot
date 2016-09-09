module.exports = {
	main: function(bot, message) {
		var version = "2.0"
		var whatsnew = "Rewrite for Discord.js v9!"
		message.channel.sendMessage("ASIANBOT " + version + ": " + whatsnew);
	}
};