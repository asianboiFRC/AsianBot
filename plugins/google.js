var google = require('google');

module.exports = {
	main: function(bot, message) {
        var search = message.content.split(" ").splice(1).join(" ");
        var nextCounter = 0;
        google.resultsPerPage = 5
        google(search, function(err, res) {
            if (err) {
                console.error(err)
                message.channel.sendMessage("ERROR: Search failed");
            }
			
			if (res === null) {
				message.channel.sendMessage("I might be ratelimited right now");
				return;
			}

            var link = res.links[0];
            var title = link.title;
            var url = link.href;
            var desc = link.description;
            message.channel.sendMessage("**Result: **" + title + "\n**Link: **" + url + "\n**Description: **" + desc);
        })
	}
};