module.exports = {
	main: function(bot, message) {
		const os = require('os');
		var osu  = require('os-utils');
		var memory = Math.round((os.totalmem() - os.freemem()) / 1000000);
		var totalmem = Math.round(os.totalmem() / 1000000);
		var date = new Date(bot.uptime);
		var strDate = '';
		strDate += date.getUTCDate() - 1 + " days, ";
		strDate += date.getUTCHours() + " hours, ";
		strDate += date.getUTCMinutes() + " minutes, ";
		strDate += date.getUTCSeconds() + " seconds";
		
		osu.cpuUsage(function(v){
		message.channel.sendMessage("```"
								+ "----- Stats for AsianBOT -----" 
								+ "\n> Created by : ASIANBOI#4122"
								+ "\n> Library    : discord.js"
								+ "\n> Users      : " + bot.users.size
								+ "\n> Channels   : " + bot.channels.size
								+ "\n> Servers    : " + bot.guilds.size
								+ "\n\n-------- VPS Details -------------"
								+ "\n> Host             : Digital Ocean"
								+ "\n> Operating System : Ubuntu Linux 14.04.4 Server"
								+ "\n> Uptime           : " + strDate
								+ "\n> Memory Usage     : " + memory + "MB / " + totalmem + " MB"
								+ "\n> CPU Usage        : " + v.toFixed(2) * 100 + "%"
								+ "```");
		});
	}
};
