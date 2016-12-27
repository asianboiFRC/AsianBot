/*Matrix v3
 *October 30, 2016
 *Created by Michael Cao (ASIANBOI)*/
 
const Discord = require('discord.js');
let bot = new Discord.Client({disableEveryone: true});
 
const config = require('./config.json');
const owner = bot.users.get(config.owner);
const sbl = require('./serverblacklist.json');
const ubl = require('./userblacklist.json');

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
var servers = require("./servers.json");

function getTime() {
	var currentTime = new Date();
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

function custom(message, user, guild) {
	message = message.replace(/{user}/gi, user.toString());
	message = message.replace(/{user:id}/gi, user.id);
	message = message.replace(/{user:name}/gi, user.username);
	message = message.replace(/{user:discrim}/gi, user.discriminator);
	message = message.replace(/{server}/gi, guild.name);
	message = message.replace(/{server:id}/gi, guild.id);
}

function findLocation(id) {
	for (i = 0; i < servers.length; i++) {
		if(servers[i].serverid == id) {
			return i;
		}
	}
	return null;
}

function insertServer(id) {
	var guild = bot.guilds.get(id);
	var guildi = {
		"servername": guild.name,
		"serverid": guild.id,
		"ownerid": guild.owner.id,
		"announcementchan": guild.id,
		"announce": false,
		"joinmessage": "{user} has joined the server.",
		"leavemessage": "{user} has left the server.",
		"banmessage": "{user} was banned.",
		"joinrole": null,
		"botrole": null,
		"prefix": config.default.prefix
	};
	servers.push(guildi);
	fs.writeFileSync("./servers.json", JSON.stringify(servers, null, 3));
	console.log(guild.name + " inserted successfully!");
}

bot.on('ready', () => {
	console.log('Matrix is ready! Loading plugins...');
	loadPlugins();
	var time = getTime();
	console.log("Bot Online and Ready! On " + bot.guilds.size + " Servers!");
	const logChannel = bot.channels.get(config.logchannel);
	logChannel.sendMessage(":stopwatch: ``" + time + "`` :mega: Matrix is online and ready! :white_check_mark:");
	bot.user.setGame(DEFAULT_PREFIX + 'help | ' + bot.guilds.size + ' Servers');
	
	bot.guilds.forEach( guild =>{
		if(!findServers(guild.id)) {
			try{
				insertServer(guild.id);
			}
			catch(e) {
				console.log(e);
			}
			return;
		}
	});

	fs.writeFileSync("./servers.json", JSON.stringify(servers, null, 3));
});

bot.on('message', (msg) => {
	var time = getTime();
	
	if (msg.channel.type === "dm") {
		console.log(gray("[" + time + "]") + server(" [PM] ") + usr(msg.author.username) + " : " + message(msg.content));
	}
	
	if (msg.channel.type === "text") {
		if (log.indexOf(msg.guild.id) > 0) {
			console.log(gray("[" + time + "] ") + server(msg.guild) + " | " + chan(msg.channel.name) + " | " + usr(msg.author.username) + ": " + message(msg.cleanContent));
		}
		
		if (msg.author.bot) {return;}
		
		if (ubl.indexOf(msg.author.id) != -1 && msg.content.startsWith(PREFIX)) {
			if(msg.author.id != config.owner) {
				msg.reply("you are blacklisted from using Matrix!");
				return;
			}
		}
		
		var id = msg.channel.guild.id;
		var location = findLocation(id);
		var PREFIX;
		if(location === undefined) {
			console.log(msg.guild.name);
			insertServer(msg.guild.id);
		}
		else {
			location = findLocation(id);
			var servers = require("./servers.json");
			PREFIX = servers[location].prefix;
		}
		
		if(msg.content == "<@!" + bot.user.id + "> What's your prefix?" || msg.content == "<@" + bot.user.id + "> What's your prefix?") {
			msg.reply(`my prefix is ${PREFIX}!`);
		}
		
		if (msg.content.startsWith(PREFIX)) {
			const logChannel = bot.channels.get(config.logchannel);
			let content = msg.content.split(PREFIX)[1];
			let cmd = content.substring(0, content.indexOf(' ')),
				args = content.substring(content.indexOf(' ') + 1, content.length);
			if (plugins.get(cmd) !== undefined && content.indexOf(' ') !== -1) {
				logChannel.sendMessage(msg.author.username + " executed " + cmd + " " + args + " in " + msg.guild.name);
				console.log(cmand(msg.author.username + " executed: " + cmd + " " + args));
				msg.content = args;
				plugins.get(cmd).main(bot, msg);
			} else if (plugins.get(content) !== undefined && content.indexOf(' ') < 0) {
				logChannel.sendMessage(msg.author.username + " executed " + content + " in " + msg.guild.name);
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

bot.on('guildMemberAdd', (member) => {
	var location = findLocation(member.guild.id);
	if (servers[location].announce === true) {
		//var message = servers[location].joinmessage;
		var message = "{user} joined the server.";
		message = custom(message, member.user, member.guild);
		var announceChannel = bot.channels.get('id', servers[location].announcementchan);
		announceChannel.sendMessage(message);
	}
	//Joinrole + Botrole
});

bot.on('guildBanAdd', (member) => {
	var location = findLocation(member.guild.id);
	if (servers[location].announce === true) {
		//var message = servers[location].banmessage;
		var message = "{user} was banned.";
		message = custom(message, member.user, member.guild);
		var announceChannel = bot.channels.get('id', servers[location].announcementchan);
		announceChannel.sendMessage(message);
	}
});

bot.on('guildMemberRemove', (member) => {
	var guildlocation = findLocation(member.guild.id);
	if (servers[guildlocation].announce === true) {
		//var message = servers[guildlocation].leavemessage;
		var message = "{user} left the server.";
		message = custom(message, member.user, member.guild);
		var announceChannel = bot.channels.get('id', servers[guildlocation].announcementchan);
		announceChannel.sendMessage(message);
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
});

bot.on("guildCreate", (guild) => {
	if (sbl.indexOf(guild.id) != -1) {
		guild.defaultChannel.sendMessage("This server is blacklisted!");
		guild.leave();
		return;
	}
	
	insertServer(guild.id);
				
	console.log(server("Bot added to " + guild.name));
	var defaultChannel = bot.channels.get(guild.id);
	defaultChannel.sendMessage("Hello! I'm Matrix. Someone invited me here. To view my commands do " + DEFAULT_PREFIX + "help!\nGive me a role with manage roles, manage guild, and administrator.");
	owner.sendMessage("I joined " + guild.name);
});

bot.on('warn', (warning) => {
	const owner = bot.users.get(config.owner);
	owner.sendMessage(warning);
});

process.on("unhandledRejection", err => {
	console.error("Uncaught Promise Error: \n" + err.stack);
	const owner = bot.users.get('id', config.owner);
	owner.sendMessage(err);
});

bot.on('disconnect', () => {
	console.log("DISCONNECTED");
	try {
		bot.destroy();
		bot.login(config.token);
	}
	catch(err) {
		process.exit(0);
	}
});

bot.login(config.token);

/*
 _____  _                       _   _     
|  __ \(_)                     | | (_)    
| |  | |_ ___  ___ ___  _ __ __| |  _ ___ 
| |  | | / __|/ __/ _ \| '__/ _` | | / __|
| |__| | \__ \ (_| (_) | | | (_| |_| \__ \
|_____/|_|___/\___\___/|_|  \__,_(_) |___/
                                  _/ |    
                                 |__/    

:::::::..-:.     ::-.
 ;;;'';;'';;.   ;;;;'
 [[[__[[\. '[[,[[['  
 $$""""Y$$   c$$"    
_88o,,od8P ,8P"`     
""YUMMMP" mM"        
  :::.     .::::::. :::  :::.   :::.    :::.:::::::.      ...     :::
  ;;`;;   ;;;`    ` ;;;  ;;`;;  `;;;;,  `;;; ;;;'';;'  .;;;;;;;.  ;;;
 ,[[ '[[, '[==/[[[[,[[[ ,[[ '[[,  [[[[[. '[[ [[[__[[\.,[[     \[[,[[[
c$$$cc$$$c  '''    $$$$c$$$cc$$$c $$$ "Y$c$$ $$""""Y$$$$$,     $$$$$$
 888   888,88b    dP888 888   888,888    Y88_88o,,od8P"888,_ _,88P888
 YMM   ""`  "YMmMY" MMM YMM   ""` MMM     YM""YUMMMP"   "YMMMMMP" MMM
 
 */
