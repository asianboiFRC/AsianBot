module.exports = {
	main: function(bot, message) {
		var config = require('../config.json');
		var isCommander = config.admins;

		if (isCommander.indexOf(message.sender.id) > -1) {
			message.channel.sendMessage(":wave: ASIANBOT is restarting...");
			var logChannel = bot.channels.get("214850991089123328");
			reason = message.content;
			if(message.content != "~restart")
				logChannel.sendMessage("AsianBot is restarting because of " + reason);
			setTimeout(function() {
				bot.destroy()
			}, 1000)
			setTimeout(function() {
				process.exit()
			}, 2000)
		}
	}
};