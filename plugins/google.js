var GoogleSearch = require('google-search');
var config = require('../config.json');
var google = new GoogleSearch({
  key: config.key,
  cx: config.cx
});

module.exports = {
	main: function(bot, message) {


        google.build({
			q: message.content,
			num: 1, // Number of search results to return between 1 and 10, inclusive
		}, function(err, response) {
			if (err) {
                console.error(err);
                message.channel.sendMessage("ERROR: Search failed");
				return;
            }
			if (response.totalResults === 0 || response.items == undefined) {
                message.channel.sendMessage("No results.");
				return;
            }
			else if(response.items != undefined) {
				console.log(response);
				var link = response.items[0].link;
				var title = response.items[0].title;
				var desc = response.items[0].snippet;
				message.channel.sendMessage("**Result: **" + title + "\n**Link: **" + link + "\n**Description: **" + desc);
			}
		});
	}
};