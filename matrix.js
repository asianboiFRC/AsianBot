/*Matrix v3
 *October 22, 2016
 *Created by Michael Cao (ASIANBOI)*/
 
const Discord = require('discord.js');
let bot = new Discord.Client({disableEveryone: true});
 
const config = require('./config.json');
const owner = bot.users.get(config.owner);
const sbl = require('./serverblacklist.json');
const ubl = require('./userblacklist.json');
const servers = require("./servers.json");

const fs = require('fs-extra');
const DEFAULT_PREFIX = config.default.prefix;

const guildsToAnnounce = config.announce;
const logChannel = config.logchannel;
const log = config.log;

var chalk = require('chalk');
var server = chalk.bold.red;
var chan = chalk.bold.green;
var message = chalk.yellow;
var usr = chalk.bold.blue;
var cmand = chalk.bgRed;
var gray = chalk.gray;

let plugins = new Map();

function getTime() {
	var currentTime = new Date()
	var n = currentTime.toTimeString();
	var str = n.substring(0, n.indexOf(' '));
	return str;
}

function loadPlugins() {
	let files = fs.readdirSync(__dirname + '/plugins', 'utf8');
	for (let plugin of files) {
		if (plugin.endsWith('.js')) {
			plugins.set(plugin.slice(0, -3), require(__dirname + '/plugins/' + plugin));
		}
	}
	console.log('Plugins loaded.');
}

function findServers(id) {
	for (i = 0; i < servers.length; i++) {
		if(servers[i].serverid == id) {
			return true;
		}
	}
	return false;
}

function findLocation(id) {
	for (i = 0; i < servers.length; i++) {
		if(servers[i].serverid == id) {
			return i;
		}
	}
	return null;
}

bot.on('ready', () => {
	console.log('Matrix is ready! Loading plugins...');
	loadPlugins();
	var time = getTime()
	console.log("Bot Online and Ready! On " + bot.guilds.size + " Servers!");
	const logChannel = bot.channels.find('id', config.logchannel);
	logChannel.sendMessage(":stopwatch: ``" + time + "`` :mega: Matrix is online and ready! :white_check_mark:");
	bot.user.setStatus("online", DEFAULT_PREFIX + 'help | ' + bot.guilds.size + ' Servers');
	
	var guilds = bot.guilds.array();
	
	for (i = 0; i < guilds.length; i++) {
		console.log(i);
		if(!findServers(guilds[i].id)) {
			var guilds = bot.guilds.array();
			var guild = {
				"id": servers.length,
				"servername": guilds[i].name,
				"serverid": guilds[i].id,
				"ownerid": guilds[i].owner.id,
				"announcementchan": guilds[i].id,
				"prefix": "~"
			}
			servers.push(guild);
		}
	}
	fs.writeFileSync("./servers.json", JSON.stringify(servers));
});

bot.on('message', (msg) => {
	var time = getTime();
	
	if (msg.channel.type === "dm") {
		var args = {
			ServerID: msg.channel.type,
			ChannelID: msg.author.id,
			User: msg.author.username,
			UserID: msg.author.id,
			Content: msg.content
		};
		//var query = 'INSERT INTO `messages` SET ?';
		//connection.query(query, args);
		console.log(gray("[" + time + "]") + server(" [PM] ") + usr(msg.author.username) + " : " + message(msg.content));
	}
	
	if (msg.channel.type === "text") {
		if (log.indexOf(msg.guild.id) > 0) {
			var args = {
				ServerID: msg.guild.id,
				ChannelID: msg.channel.id,
				User: msg.author.username,
				UserID: msg.author.id,
				Content: msg.content
			};
			
			//var query = 'INSERT INTO `messages` SET ?';
			//connection.query(query, args);
			console.log(gray("[" + time + "] ") + server(msg.guild) + " | " + chan(msg.channel.name) + " | " + usr(msg.author.username) + ": " + message(msg.cleanContent));
		}
		
		if (msg.author.bot) {return;}
		
		if (ubl.indexOf(msg.author.id) != -1 && msg.content.startsWith(PREFIX)) {
			if(msg.author.id != config.owner) {
				msg.reply("you are blacklisted from using Matrix!")
				return;
			}
		}
		
		var id = msg.channel.guild.id;
		var location = findLocation(id);
		var PREFIX = servers[location].prefix;
		//console.log(PREFIX);
		
		if(msg.content == "<@!" + bot.user.id + "> What's your prefix?" || msg.content == "<@" + bot.user.id + "> What's your prefix?") {
			msg.reply("my prefix is `" + PREFIX + "`!");
		}
		
		if (msg.content.startsWith(PREFIX)) {
			const logChannel = bot.channels.find('id', config.logchannel);
			let content = msg.content.split(PREFIX)[1];
			let cmd = content.substring(0, content.indexOf(' ')),
				args = content.substring(content.indexOf(' ') + 1, content.length);
			if (plugins.get(cmd) !== undefined && content.indexOf(' ') !== -1) {
				logChannel.sendMessage(msg.author.username + " executed " + cmd + " " + args + " in " + msg.guild.name);
				console.log(cmand(msg.author.username + " executed: " + cmd + " " + args));
				msg.content = args;
				plugins.get(cmd).main(bot, msg);
			} else if (plugins.get(content) !== undefined && content.indexOf(' ') < 0) {
				logChannel.sendMessage(msg.author.username + " executed " + cmd + " in " + msg.guild.name);
				console.log(cmand(msg.author.username + " executed: " + content));
				plugins.get(content).main(bot, msg);
			} else {
				console.log('BROKEN:' + content);
			}
		}
	}
});

bot.on("messageUpdate", (msg1, msg2) => {
	if(msg1.author.id == bot.user.id) return;
	if(msg1.author.bot) return;

	try {
		if (log.indexOf(msg1.guild.id) > 0) {
			console.log(server(msg1.author.username + "'s message was edited!\n Old message: " + msg1.content));
		}
	} catch (err) {
		console.log(server("ERROR UPDATED MESSAGE"));
	}
});

bot.on('guildMemberAdd', (guild, user) => {
	if (guildsToAnnounce.indexOf(guild.id) > -1) {
		var defaultChannel = bot.channels.get(guild.id);
		defaultChannel.sendMessage(":wave: " + user.user.username + " joined the server.");
	}
});

bot.on('guildBanAdd', (guild, user) => {
	if (guildsToAnnounce.indexOf(guild.id) > -1) {
		var defaultChannel = bot.channels.get(guild.id);
		defaultChannel.sendMessage(":hammer: " + user.username + " was banned.");
	}
});

bot.on('guildMemberRemove', (guild, user) => {
	if (guildsToAnnounce.indexOf(guild.id) > -1) {
		var defaultChannel = bot.channels.get(guild.id);
		defaultChannel.sendMessage(user.user.username + " left the server. RIP " + user.user.username + ".");
	}
});

bot.on("guildDelete", (guild) => {
	var id = guild.id;
	var location = findLocation(id);
	
	delete servers[location];
	fs.writeFileSync("./servers.json", JSON.stringify(servers));
	
	const owner = bot.users.get(config.owner);
	console.log("I left " + guild.name);
	owner.sendMessage("I left " + guild.name);
})

bot.on("guildCreate", (guild) => {
	if (sbl.indexOf(guild.id) != -1) {
		guild.defaultChannel.sendMessage("This server is blacklisted!");
		guild.leave();
		return;
	}
	
	var guilds = bot.guilds.array();
	var guild = {
		"id": servers.length,
		"servername": guilds[i].name,
		"serverid": guilds[i].id,
		"ownerid": guilds[i].owner.id,
		"announcementchan": guild[i].id,
		"prefix": "~"
	}
	servers.push(guild);
	fs.writeFileSync("./servers.json", JSON.stringify(servers));
	
	var PREFIX = args.Prefix;
			
	console.log(server("Bot added to " + guild.name));
	var defaultChannel = bot.channels.get(guild.id);
	defaultChannel.sendMessage("Hello! I'm Matrix. Someone invited me here. To view my commands do " + PREFIX + "help!\nGive me a role with manage roles, manage guild, and administrator.");
	owner.sendMessage("I joined " + guild.name);
});

bot.on('warn', (warning) => {
	const owner = bot.users.get(config.owner);
	owner.sendMessage(warning);
});

process.on("unhandledRejection", err => {
	console.error("Uncaught Promise Error: \n" + err.stack);
	const owner = bot.users.get(config.owner);
	owner.sendMessage(err);
});

bot.on('disconnect', () => {
	bot.login(config.token);
});

bot.login(config.token);