module.exports = {
	main: function(bot, message) {
		var fs = require('fs');
		var sbl = require('../serverblacklist.json');
		var config = require('../config.json');
		
		if (message.author.id === config.owner || config.admins.indexOf(message.author.id)!= -1) {
			let args = message.content.split(" ")
			console.log("[DEVELOPER DEBUG] Blacklist args were: " + args)
			
			if (args[0] === "remove") {
				sbl.splice(sbl.indexOf(args[1]))
				fs.writeFile("./serverblacklist.json", JSON.stringify(sbl))
				message.reply("Server removed from blacklist!");
			} else if (args[0] === "add") {
				sbl.push(args[1])
				fs.writeFile("./serverblacklist.json", JSON.stringify(sbl));
				message.reply("Server added to blacklist!");
			} else {
				message.reply(`you need to specify what to do! ~blacklist <add/remove> <server id>`)
			}
		} else {
			message.channel.sendMessage("Sorry, this command is for the owner only.")
		}
	}
};