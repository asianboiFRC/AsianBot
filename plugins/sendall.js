module.exports = {
	main: function(bot, message) {
		var announcement = message.content;
		var guilds = bot.guilds.array();
		
		if (message.author.id === "171319044715053057") {
			var embed = new Discord.RichEmbed();
			embed.setTitle("An important notice from the developer of Matrix")
				.setColor(0x1675DB)
				.setAuthor(message.author.user.username, 'http://asianboi.ml/i/gjacs.png')
				.setDescription(':loud_sound: ' + announcement)
				.setFooter(message.author.username + ' #' + message.author.discriminator, 'http://asianboi.ml/i/gjacs.png')\
				.setTimestamp();
            for (i = 0; i < guilds.length; i++) {
				if(guilds[i].id != "110373943822540800") {
					guilds[i].defaultChannel.sendEmbed(embed,{ disableEveryone: true });
				}
			}
        }
	}
};
