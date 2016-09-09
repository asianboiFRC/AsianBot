module.exports = {
	main: function(bot, message) {
		if (message.author.id === "171319044715053057") {
			const serverToInvite = message.content.split(" ").splice(1).join(" ");
			message.channel.sendMessage("Alright I am sending you an invite to " + serverToInvite + "!");
			try {
				var server = bot.guilds.find('name', serverToInvite);
				var chan = bot.channels.find('id', server.id);
				chan.createInvite({
						temporary: false,
						maxAge: 60,
						maxUses: 1,
					})
					.then(i => {
						message.author.sendMessage("https://discord.gg/" + i.code);
					});
			}
			catch(err) {
				console.log(err);
			}
        }
	}
};