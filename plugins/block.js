module.exports = {
	main: function(bot, message) {
		var fs = require('fs');
		var ubl = require('../userblacklist.json');
		var config = require('../config.json');
		var blockee = message.mentions.users.array()[0];
		try{
			var id = blockee.id;
		}
		catch(e) {
			message.channel.sendMessage("MENTION YOU DUMMY");
			return;
		}
		
		if (message.author.id === config.owner || config.admins.indexOf(message.author.id)!= -1) {
			let args = message.content.split(" ");
			console.log("[DEVELOPER DEBUG] Blacklist args were: " + args)
			
			if (args[0] === "remove") {
				ubl.splice(id)
				fs.writeFile("./userblacklist.json", JSON.stringify(ubl));
				message.reply("User removed from blacklist!");
			} else if (args[0] === "add") {
				ubl.push(id)
				fs.writeFile("./userblacklist.json", JSON.stringify(ubl));
				message.reply("User added to blacklist!");
			} else {
				message.channel.sendMessage(`You need to specify what to do! ~serverblacklist <add/remove> <server id>`)
			}
		} else {
			message.channel.sendMessage(message, "Sorry, this command is for the owner only.")
		}
	}
};