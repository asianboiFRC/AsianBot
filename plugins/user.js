module.exports = {
	main: function(bot, message) {
		if (message.content === prefix + "user") {
            bot.sendMessage(message,
                "Name: " + message.sender.username +
                "\nDiscriminator: " + message.sender.discriminator +
                "\nID: " + message.sender.id +
                "\nCreated: " + message.sender.createdAt +
                "\nStatus: " + message.sender.online +
                "\n" + message.sender.avatarURL);
        } else if (message.content.startsWith(prefix + "user")) {
            var user = message.mentions[0];
            bot.sendMessage(message,
                "Name: " + user.username +
                "\nDiscriminator: " + user.discriminator +
                "\nID: " + user.id +
                "\nCreated: " + user.createdAt +
                "\nStatus: " + user.online +
                "\n" + user.avatarURL);
        }
	}
};