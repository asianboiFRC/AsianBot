var Cleverbot = require('cleverbot-node');
var cleverbot = new Cleverbot;

module.exports = {
	main: function(bot, message) {
		var cleverMessage = message.content.split(" ").splice(1).join(" ");

        Cleverbot.prepare(function() {
            cleverbot.write(cleverMessage, function(response) {
                bot.sendMessage(message, response.message);
            });
        });
	}
};