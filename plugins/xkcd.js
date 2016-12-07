module.exports = {
	main: function(bot, message) {
		var xkcd = require('xkcd');
		
			xkcd(function (err, res) {
				if(!err) {
					message.channel.sendMessage("**" + res.num + "**: " + res.title + "\n" + res.img + "\n*" + res.alt);
					console.log(data);
				}
			});
	}
};