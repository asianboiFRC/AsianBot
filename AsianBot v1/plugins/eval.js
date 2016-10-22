module.exports = {
	main: function(bot, message) {
		var isCommander = ["143194991886467072", "171319044715053057", "176870986900045824", "213108782388084736", "180094452860321793"];
		if (message.sender.id === "171319044715053057" || isCommander.indexOf(message.sender.id) > -1) {
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