module.exports = {
	main: function(bot, message) {
		if (message.sender.id === "171319044715053057") {
            //Runs code
            var evalcode = message.content.split(" ").splice(1).join(" ");

            try {
                if (evalcode.startsWith("~eval bot.internal.token") || evalcode.startsWith("~eval eval")) {
                    bot.sendMessage(message, "You're not getting my token");
                } else{
                    bot.sendMessage(message, "Code: ``" + evalcode + "``\nOutput: ``" + eval(evalcode) + "``");
                }
            } catch (err) {
                bot.sendMessage(message, "Error: " + err);
            }
        } else {
            bot.sendMessage(message, "You do not have permission to use this command");
        }
	}
};