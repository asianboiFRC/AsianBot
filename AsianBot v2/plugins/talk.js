var Cleverbot = require('cleverbot-node');
var cleverbot = new Cleverbot;

module.exports = {
	main: function(bot, message) {
		var cleverMessage = message.content;

        Cleverbot.prepare(function() {
            cleverbot.write(cleverMessage, function(response) {
                message.channel.sendMessage(response.message);
            });
        });
	}
};