const Discord = require('discord.js')
const Player = require("discord-player")
const bot = new Discord.Client({intents :3276799})
const loadCommands = require("./Loaders/loadCommands")
const loadEvents = require("./Loaders/loadEvents")
const config = require("./config")


bot.player = new Player.Player(bot, {

    leaveOnEnd: true,
    leaveOnEmpty: true,
    initialVolume: 70,
    ytdlOptions: {
        filter: "audioonly",
        quality: "highestaudio",
        highWaterMark: 1 << 25,

    }

    
})


bot.commands = new Discord.Collection()
bot.color = "#ffffff";
bot.functions = {
    createid: require("./Fonctions/createid")
    
}


bot.login(config.token)
loadCommands(bot)
loadEvents(bot)




