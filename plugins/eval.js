module.exports = {
	main: function(bot, message) {
		var isCommander = ["143194991886467072", "171319044715053057", "176870986900045824", "213108782388084736", "180094452860321793"];
		if (message.author.id === "171319044715053057" || isCommander.indexOf(message.author.id) > -1) {
            //Runs code
            var evalcode = message.content.split(" ").splice(1).join(" ");

            try {
                if (evalcode.startsWith("~eval bot.internal.token") || evalcode.startsWith("~eval eval")) {
                    message.channel.sendMessage("You're not getting my token");
                } else{
                    message.channel.sendMessage("Code: ``" + evalcode + "``\nOutput: ``" + eval(evalcode) + "``");
                }
            } catch (err) {
                message.channel.sendMessage("Error: " + err);
            }
        } else {
             message.channel.sendMessage("You do not have permission to use this command");
        }
	}
};