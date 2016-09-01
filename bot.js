/*AsianBot v1.6
 *August 31, 2016
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

/*var connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});
connection.connect();*/

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
		if (msg.server.id != 110373943822540800) {
			console.log(gray("[" + str + "] ") + server(msg.server) + " | " + chan(msg.channel.name) + " | " + usr(msg.sender.username) + ": " + message(msg.cleanContent));
		}
	} catch (err) {
		console.log(gray("[" + str + "]") + server(" [PM] ") + usr(msg.sender.name) + " : " + message(msg.cleanContent));
		return;
	}
	
	if (msg.author.bot) return;
	
	if (msg.content.startsWith(PREFIX)) {
		let content = msg.content.split(PREFIX)[1];
		let cmd = content.substring(0, content.indexOf(' ')),
			args = content.substring(content.indexOf(' ') + 1, content.length);
		if (plugins.get(cmd) !== undefined && content.indexOf(' ') !== -1) {
			console.log(cmand(msg.sender.username + " executed: " + cmd));
			plugins.get(cmd).main(bot, msg);
		} else if (plugins.get(content) !== undefined && content.indexOf(' ') < 0) {
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
    try {
        console.log(server(msg.sender.username + "'s message was deleted!\n Old message: " + msg.content));
    } catch (err) {
        console.log(server("ERR: MESSAGE NOT ARCHIVED"));
    }
});

bot.on("messageUpdated", function(message1, message2) {
    if (server.id === "176186766946992128") {
        console.log(server(message1.sender.username + "'s message was edited!\n Old message: " + message1.content));
    }
});

bot.on("serverDeleted", function(server) {
    console.log("Attempting to remove " + server.name + " from the database!");
    connection.query("DELETE FROM servers WHERE serverid = '" + server.id + "'", function(error) {
        if (error) {
            console.log(error);
            return;
        }
        console.log("Server Removed!");
    })
})

bot.on("serverCreated", function(svr) {
    console.log("Trying to insert server " + svr.name + " into database");
    var info = {
        "servername": "'" + svr.name + "'",
        "serverid": svr.id,
        "ownerid": svr.owner.id,
        "PREFIX": "~"
    }

    connection.query("INSERT INTO servers SET ?", info, function(error) {
        if (error) {
            console.log(error);
            return;
        }
        console.log("Server Inserted!");
    })

    console.log(server("Bot added to " + svr.name));
    bot.sendMessage(svr.defaultChannel, "Hello! I'm AsianBOT. Someone invited me here. To view my commands do " + PREFIX + "help!\nGive me a role with manage roles, manage server, and administrator.");
});