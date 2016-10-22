module.exports = {
	main: function(bot, message) {
		if (message.sender.id === "171319044715053057" || isCommander.indexOf(message.sender.id) > -1) {
            var sudosay = message.content.split(" ").splice(1).join(" ");
            bot.sendMessage(message, sudosay);
            bot.deleteMessage(message);
        }
	}
};