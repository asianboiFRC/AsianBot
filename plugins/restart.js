module.exports = {
	main: function(bot, message) {
		var isCommander = ["143194991886467072", "171319044715053057", "176870986900045824", "213108782388084736", "180094452860321793"];
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