module.exports = {
	main: function(bot, message) {
		var isCommander = ["143194991886467072", "171319044715053057", "176870986900045824", "213108782388084736", "180094452860321793"];
		try {
            if (message.author.id === "171319044715053057") {
                message.channel.sendMessage(message.author.username + " :white_check_mark: Verified! Hello ASIANBOI.");
            } else if (isCommander.indexOf(message.author.id) > -1) {
                message.channel.sendMessage(message.author.username + " :white_check_mark: You have been verified as a bot admin!");
            } else if (message.author === message.guild.owner) {
                message.channel.sendMessage(message.author.username + " :white_check_mark: You have been verified as the server owner!");
            } else if (message.member.roles.exists('name', 'Bot Commander')) {
                message.channel.sendMessage(message.author.username + " :white_check_mark: You have been verified as a Bot Commander.");
            } else if (message.author.id === "183678606705164288") {
                message.channel.sendMessage(message.author.username + " :white_check_mark: You have been verified as someone who likes poutine :D.");
            } else {
                message.channel.sendMessage(message.author.username + " :negative_squared_cross_mark: You have not been verified");
            }
        } catch (err) {
			console.log(err);
            message.channel.sendMessage("ERROR: ERROR IN ~VERIFY");
        }
	}
};