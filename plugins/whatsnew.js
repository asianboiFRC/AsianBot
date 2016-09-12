module.exports = {
	main: function(bot, message) {
		var news = require('../news.json');
		var version = news.version;
		var whatsnew = news.whatsnew;
		message.channel.sendMessage("ASIANBOT " + version + ": " + whatsnew);
	}
};