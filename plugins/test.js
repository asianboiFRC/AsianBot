var unirest = require('unirest');

module.exports = {
	main: function(bot, message) {
		unirest.post('https://canary.discordapp.com/api/webhooks/233746391933911040/B7whXay-_eJ2uUKGaFCGiPPJFXB36QzuCeAiANsUfL5LRAUuSZKQ6W9n0ec6JqSQB6cL')
		.send({
			"username": "This is MAGIC",
			"text": "I don't know what you think this will achieve but I know it will be GREATNESS",
			"attachments": [{
				"title": "Did something move?",
				"pretext": "If they don't move I can't see them.",
				"author_name": "Evelyne Lachance",
				"author_link": "http://www.youareanidiot.org/",
				"author_icon": "https://cdn.discordapp.com/emojis/214143468962840588.png",
				"footer": "Did something move?",
				"image_url": "http://i.imgur.com/njL3Jy0.png",
				"footer_icon": "https://cdn.discordapp.com/emojis/214143468962840588.png",
				"ts": 123456789
			}]
		});
	}
};