module.exports = {
	main: function(bot, message) {
		var isCommander = ["143194991886467072", "171319044715053057", "176870986900045824", "213108782388084736", "180094452860321793"];
		if (message.content.startsWith(prefix + "restart") && isCommander.indexOf(message.sender.id) > -1) {
			bot.sendMessage(message, ":wave: ASIANBOT is restarting...\n*Windows XP shutdown sounds*");
			setTimeout(function() {
				bot.logout()
			}, 1000)
			setTimeout(function() {
				process.exit()
			}, 2000)
		}
	}
};