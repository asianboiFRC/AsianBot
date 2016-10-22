module.exports = {
	main: function(bot, message) {
		var config = require('../config.json');
		var isCommander = config.admins;
		
		if (message.author.id === "171319044715053057") {
			var response = " :white_check_mark: Verified! Hello ASIANBOI.";
		} else if (isCommander.indexOf(message.author.id) > -1) {
			var response = " :white_check_mark: You have been verified as a global bot admin!";
		} else if (message.author === message.guild.owner) {
			var response = " :white_check_mark: You have been verified as the server owner!";
		} else if (message.member.roles.exists('name', 'Bot Commander')) {
			var response = " :white_check_mark: You have been verified as a Bot Commander.";
		} else {
			var response = " :negative_squared_cross_mark: You have not been verified";
		}
		
		message.channel.sendMessage("Verifying")
        .then(msg => setTimeout(() => {msg.edit("Verifying.  `25% Complete`")
			setTimeout(() => {msg.edit("Verifying.. `50% Complete`")
				setTimeout(() => {msg.edit("Verifying.. `75% Complete`")
					setTimeout(() => {msg.edit("Making sure our records are right")
						setTimeout(() => {msg.edit(message.author + response)
						}, 1000)
					}, 1000)
				}, 1000)
			}, 1000)
        }, 1000));
	}
};