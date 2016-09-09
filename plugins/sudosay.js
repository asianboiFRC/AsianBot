module.exports = {
	main: function(bot, message) {
		if (message.author.id === "171319044715053057" || isCommander.indexOf(message.author.id) > -1) {
            var sudosay = message.content.split(" ").splice(1).join(" ");
            message.channel.sendMessage(sudosay);
            message.delete();
        }
	}
};