module.exports = {
	main: function(bot, message) {
		var xkcd = require('xkcd');
		
		if(message.content == "frc") {
			xkcd(689, function (err, res) {
				if(!err) {
					message.channel.sendMessage("**" + res.num + "**: " + res.title + "\n" + res.alt + "\n*" + res.alt);
					console.log(data);
				}
				
				if(err) {
					message.channel.sendMessage("Error retrieving XKCD.");
				}
			});
		}
		
		if(message.content != "~xkcd") {
			xkcd(message.content, function (err, res) {
				if(!err) {
					message.channel.sendMessage("**" + res.num + "**: " + res.title + "\n" + res.alt + "\n*" + res.alt);
					console.log(data);
				}
				
				if(err) {
					message.channel.sendMessage("Error retrieving XKCD.");
				}
			});
		}
		if(message.content == "~xkcd"){
			xkcd(function (err, res) {
				if(!err) {
					message.channel.sendMessage("**" + res.num + "**: " + res.title + "\n" + res.alt + "\n*" + res.alt);
					console.log(data);
				}
			});
		}
	}
};