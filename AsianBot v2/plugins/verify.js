module.exports = {
	main: function(bot, message) {
		var config = require('../config.json');
		var isCommander = config.admins;
		
		try {
            if (message.author.id === "171319044715053057") {
                message.channel.sendMessage(message.author.username + " :white_check_mark: Verified! Hello ASIANBOI.");
            } else if (isCommander.indexOf(message.author.id) > -1) {
                message.channel.sendMessage(message.author.username + " :white_check_mark: You have been verified as a global bot admin!");
            } else if (message.author === message.guild.owner) {
                message.channel.sendMessage(message.author.username + " :white_check_mark: You have been verified as the server owner!");
            } else if (message.member.roles.exists('name', 'Bot Commander')) {
                message.channel.sendMessage(message.author.username + " :white_check_mark: You have been verified as a Bot Commander.");
            } else {
                message.channel.sendMessage(message.author.username + " :negative_squared_cross_mark: You have not been verified");
            }
        } catch (err) {
			console.log(err);
            message.channel.sendMessage("ERROR: ERROR IN ~VERIFY");
        }
	}
};