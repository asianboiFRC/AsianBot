module.exports = {
	main: function(bot, message) {
		if (message.sender.id === "171319044715053057") {
			const serverToInvite = message.content.split(" ").splice(1).join(" ");
			bot.sendMessage(message, "Alright I am sending you an invite to " + serverToInvite + "!");
			try {
				bot.createInvite(bot.servers.get("name", serverToInvite).generalChannel, {
						maxAge: 60,
						maxUses: 1
					})
					.then(i => {
						bot.sendMessage(message.author, i + "");
					});
			}
			catch(err) {
				bot.sendMessage(message, "I do not have permission to create an invite.");
			}
        }
	}
};