module.exports = {
	main: function(bot, message) {
		var announcement = message.content;
		var guilds = bot.guilds.array();
		
		if (message.author.id === "171319044715053057") {
            		for (i = 0; i < guilds.length; i++) {
				if(guilds[i].id != "110373943822540800") {
					guilds[i].defaultChannel.sendMessage('**This is an important announcement from the developer of ' + bot.user.username + 
					'.** \n:loud_sound: *"' + announcement + '"*\n**-' + message.author.username + ' #' + message.author.discriminator + '**');
				}
			}
        	}
	}
};
