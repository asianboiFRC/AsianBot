module.exports = {
	main: function(bot, message) {
		var xkcd = require('xkcd');
			
		xkcd(function (data) {
			message.channel.sendMessage("**" + data.num + "**: " + data.title + "\n" + data.alt + "\n*" + data.img);
			console.log(data);
		});
	}
};