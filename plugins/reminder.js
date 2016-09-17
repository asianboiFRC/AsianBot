module.exports = {
	main: function(bot, message) {
		try {
			var c = message.content.substring(message.content.indexOf(' ') + 1, message.content.length);
			var msg = c.split(" ").splice(1).join(" ").split("|");
			msg[0] = msg[0].replace(/\s/g,'');
			var time = parseTime(msg[0]);
			var reminder = msg[1].trim();
			message.reply("I will PM you a reminder to " + reminder + " in " + time + "!");
			setTimeout(function() {
				message.author.sendMessage(message.author + " Reminder: " + reminder);
			}, time.countdown);

			function parseTime(str) {
				var num, time;
				if (str.indexOf(" ") > -1) {
					num = str.substring(0, str.indexOf(" "));
					time = str.substring(str.indexOf(" ") + 1).toLowerCase();
				} else {
					for (var i = 0; i < str.length; i++) {
						if (str.substring(0, i) && !isNaN(str.substring(0, i)) && isNaN(str.substring(0, i + 1))) {
							num = str.substring(0, i);
							time = str.substring(i);
							break;
						}
					}
				}
				if (!num || isNaN(num) || num < 1 || !time || ["d", "day", "days", "h", "hr", "hrs", "hour", "hours", "m", "min", "mins", "minute", "minutes", "s", "sec", "secs", "second", "seconds"].indexOf(time) == -1) {
					return;
				}
				var countdown = 0;
				switch (time) {
					case "d":
					case "day":
					case "days":
						countdown = num * 86400000;
						break;
					case "h":
					case "hr":
					case "hrs":
					case "hour":
					case "hours":
						countdown = num * 3600000;
						break;
					case "m":
					case "min":
					case "mins":
					case "minute":
					case "minutes":
						countdown = num * 60000;
						break;
					case "s":
					case "sec":
					case "secs":
					case "second":
					case "seconds":
						countdown = num * 1000;
						break;
				}
				return {
					num: num,
					time: time,
					countdown: countdown
				};
			}
		} catch (err) {
			message.channel.sendMessage("Invalid arguments.")
		}
	}
};