const { Client, Intents, Collection, MessageEmbed } = require("discord.js");
const client = global.client = new Client({ 'intents': [32767]});
const fs = require("fs");
var request = require('request');
const moment = require('moment');
const config = require("./config.json");
client.commands = new Collection();
client.aliases = new Collection();
fs.readdirSync("./commands").filter(file => file.endsWith(".js")).forEach(file => {
    let command = require(`./commands/${file}`);
    client.commands.set(command.conf.command, command);
    command.conf.aliases.forEach(aliases => {
    client.aliases.set(aliases, command)  
    });
});

fs.readdirSync("./events").filter(file => file.endsWith(".js")).forEach(file => {
    let event = require(`./events/${file}`);
    client.on(event.conf.event, event.execute);
});












client.login(config.token).then(c => console.log(`Bot açıldı.`)).catch(err => console.error(`Tokeni değiştirmeyi unutma.`));
