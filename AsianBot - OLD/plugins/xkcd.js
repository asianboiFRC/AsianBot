module.exports = {
	main: function(bot, message) {
		var xkcd = require('xkcd-imgs');
		xkcd.img(function(err, res){
			if(!err) {
				bot.sendMessage(message, res.title + "\n" + res.url);
				console.log(res);
			}
		});
	}
};