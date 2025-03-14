const Discord = require('discord.js')

module.exports = { 

    name : "kick",
    description: "Kick quelqu'un",
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    category: "Modération",

    options : [
        {
            type: "user",
            name: "membre",
            description: "le membre a kick",
            required: true,
            autocomplete: false

        }, {
            type: "string",
            name: "raison",
            description: "la raison de l'expulsion",
            required: false,
            autocomplete: false

        }

    ],

    async run(bot, message, args){

        
        let user = args.getUser("membre");
        if(!user) return message.reply("L'utilisateur n'existe pas")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("L'utilisateur n'existe pas")

        let reason = args.getString("raison");
        if(!reason) reason = "Aucune raison fournie";

        if(message.user.id === member.id) return message.reply("Vous ne pouvez pas vous kick")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Vous ne pouvez pas kick le propriétaire du serveur")
        if(member && !member.kickable) return message.reply("Je peux pas kick ce membre")
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Vous ne pouvez pas kick ce membre")

        try {await user.send(`Vous êtes kick du serveur ${message.guild.name} par ${message.user.tag} pour la raison : \`${reason}\``)} catch (err) {}

        await message.reply(`${message.user} a kick ${user.tag} pour la raison de : \`${reason}\``)

        await member.kick(reason)


    }
}