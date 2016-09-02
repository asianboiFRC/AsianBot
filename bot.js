/*AsianBot v1.6
 *September 1, 2016
 *Created by Michael Cao (ASIANBOI)*/

'use strict';

const Discord = require('discord.js');
const fse = require('fs-extra');
var PREFIX = "~";
var version = "1.6"
var whatsnew = "Rewrite!"
var fs = require('fs')
fs.readFile('token.txt', 'utf8', function(err, token) {
    if (err) {
        return console.log(err);
    }
    bot.loginWithToken(token);
});

var isCommander = ["143194991886467072", "171319044715053057", "176870986900045824", "213108782388084736", "180094452860321793"];

var chalk = require('chalk');
var server = chalk.bold.red;
var chan = chalk.bold.green;
var message = chalk.yellow;
var usr = chalk.bold.blue;
var cmand = chalk.bgRed;
var gray = chalk.gray;
let bot = new Discord.Client({
  disableEveryone: true
});

var replyTextToMentions = "Hi! I'm AsianBOT. Use " + PREFIX + "help to see a list of my commands.";

let plugins = new Map();

function loadPlugins() {
	console.log(__dirname + '/plugins');
	let files = fse.readdirSync(__dirname + '/plugins', 'utf8');
	for (let plugin of files) {
		if (plugin.endsWith('.js')) {
			console.log(plugin.slice(0, -3));
			plugins.set(plugin.slice(0, -3), require(__dirname + '/plugins/' + plugin));
			console.log('Map: ' + plugins.has(plugin.slice(0, -3)));
		} else {
			console.log(plugin);
		}
	}
    console.log('Plugins loaded.');
}

bot.on('ready', function() {
	console.log('AsianBot is ready! Loading plugins...');
	loadPlugins();
	
	var str = "";
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var seconds = currentTime.getSeconds()
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    str += hours + ":" + minutes + ":" + seconds;
    console.log("Bot Online and Ready! On " + bot.servers.length + " Servers!");
    bot.sendMessage("214876995375464448", ":stopwatch: ``" + str + "`` :mega: AsianBOT is online and ready! :white_check_mark:");
    bot.setPlayingGame('~help | ' + bot.servers.length + " Servers")
});

bot.on('message', function(msg) {
	var str = "";
    var currentTime = new Date()
	var hours = currentTime.getHours()
	var minutes = currentTime.getMinutes()
	var seconds = currentTime.getSeconds()
	if (minutes < 10) {
		minutes = "0" + minutes
	}
	if (seconds < 10) {
		seconds = "0" + seconds
	}
	str += hours + ":" + minutes + ":" + seconds;
	
	try {
		if (msg.server.id != "110373943822540800" && msg.server.id != "185858769895424001") {
			bot.sendMessage("221038566308839426", "[" + str + "] " + msg.server + " | " + msg.channel.name + " | " + msg.sender.username + ": " + msg.cleanContent);
			console.log(gray("[" + str + "] ") + server(msg.server) + " | " + chan(msg.channel.name) + " | " + usr(msg.sender.username) + ": " + message(msg.cleanContent));
		}
	} catch (err) {
		bot.sendMessage("221038566308839426", "[" + str + "]" + " [PM] " + msg.sender.name + " : " + msg.cleanContent);
		console.log(gray("[" + str + "]") + server(" [PM] ") + usr(msg.sender.name) + " : " + message(msg.cleanContent));
		return;
	}
	
	if (msg.author.bot) return;
	
	if (msg.content.startsWith(PREFIX)) {
		let content = msg.content.split(PREFIX)[1];
		let cmd = content.substring(0, content.indexOf(' ')),
			args = content.substring(content.indexOf(' ') + 1, content.length);
		if (plugins.get(cmd) !== undefined && content.indexOf(' ') !== -1) {
			bot.sendMessage("214876995375464448", msg.sender.username + " executed " + cmd + " in " + msg.server.name);
			console.log(cmand(msg.sender.username + " executed: " + cmd));
			plugins.get(cmd).main(bot, msg);
		} else if (plugins.get(content) !== undefined && content.indexOf(' ') < 0) {
			bot.sendMessage("214876995375464448", msg.sender.username + " executed " + cmd + " in " + msg.server.name);
			console.log(cmand(msg.sender.username + " executed: " + content));
			plugins.get(content).main(bot, msg);
		} else {
			console.log('ERROR:' + content);
		}
	}
});

bot.on('serverNewMember', function(server, user) {
	if (server.id === "209467012684972034" || server.id === "214850991089123328" || server.id === "215965218449260544") {
        bot.sendMessage(server.defaultChannel, ":wave: " + user.username + " joined the server.");
    }
});

bot.on('serverMemberRemoved', function(server, user) {
	if (server.id === "209467012684972034" || server.id === "214850991089123328" || server.id === "215965218449260544") {
        bot.sendMessage(server.defaultChannel, user.username + " left the server. RIP " + user.username + ".");
    }
});

bot.on('userBanned', function(server, user) {
    if (server.id === "209467012684972034" || server.id === "214850991089123328" || server.id === "215965218449260544") {
        bot.sendMessage(server.defaultChannel, ":hammer: " + user.username + " was banned.");
    }
});

bot.on("messageDeleted", function(message) {
	if (message.server.id != "110373943822540800") {
		try {
			console.log(server(msg.sender.username + "'s message was deleted!\n Old message: " + msg.content));
			bot.sendMessage("214876995375464448", msg.sender.username + "'s message was deleted!\n Old message: " + msg.content);
		} catch (err) {
			console.log(server("ERR: MESSAGE NOT ARCHIVED"));
			bot.sendMessage("214876995375464448", "ERR: MESSAGE NOT ARCHIVED");
		}
	}
});

bot.on("messageUpdated", function(message1, message2) {
    if (msg.server.id != "110373943822540800") {
		bot.sendMessage("214876995375464448", message1.sender.username + "'s message was edited!\n Old message: " + message1.content);
        console.log(server(message1.sender.username + "'s message was edited!\n Old message: " + message1.content));
    }
});

bot.on("serverDeleted", function(server) {
    console.log(server.name + " kicked me!");
	bot.sendMessage("214876995375464448", server.name + " kicked me!");
})

bot.on("serverCreated", function(svr) {
    console.log(server("Bot added to " + svr.name));
bot.sendMessage("214876995375464448", "Bot added to " + svr.name);
    bot.sendMessage(svr.defaultChannel, "Hello! I'm AsianBOT. Someone invited me here. To view my commands do " + PREFIX + "help!\nGive me a role with manage roles, manage server, and administrator.");
});