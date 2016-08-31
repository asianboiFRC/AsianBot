module.exports = {
	main: function(bot, message) {
		try {
            if (message.sender.id === "171319044715053057") {
                bot.sendMessage(message, message.sender.username + " :white_check_mark: Verified! Hello ASIANBOI.");
            }
            if (isCommander.indexOf(message.sender.id) > -1) {
                bot.sendMessage(message, message.sender.username + " :white_check_mark: You have been verified as a bot admin!");
            } else if (message.sender === message.server.owner) {
                bot.sendMessage(message, message.sender.username + " :white_check_mark: You have been verified as the server owner!");
            } else if (bot.memberHasRole(message.author, message.server.roles.get("name", "Bot Commander"))) {
                bot.sendMessage(message, message.sender.username + " :white_check_mark: You have been verified as a Bot Commander.");
            } else if (message.sender.id === "183678606705164288") {
                bot.sendMessage(message, message.sender.username + " :white_check_mark: You have been verified as someone who likes poutine :D.");
            } else {
                bot.sendMessage(message, message.sender.username + " :negative_squared_cross_mark: You have not been verified");
            }
        } catch (err) {
            bot.sendMessage(message, "ERROR: ERROR IN ~VERIFY");
        }
	}
};