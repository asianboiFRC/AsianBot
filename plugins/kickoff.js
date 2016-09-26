module.exports = {
	main: function(bot, message) {
		var d1 = new Date("2017", "0", "7", "12", "0");
        var d2 = new Date();
        var t1 = d1.getTime();
        var t2 = d2.getTime();
		var time = t1 - t2;
		var days = parseInt(time/86400000);
		var totalHours = parseInt(time / 3600000);
		var hours = parseInt((time-(days*86400000)) / 3600000);
		var totalMinutes = parseInt(time / 60000);
		var minutes = parseInt((time - (totalHours * 3600000)) / 60000) ;
		var seconds = parseInt((time - (totalMinutes * 60000)) / 1000) ;
        message.channel.sendMessage("Time until *FIRST®* Steamworks℠ Kickoff: \n**" + days + " days, " + hours + " hours, " + minutes + " minutes, and " + seconds + " seconds**");
	}
};