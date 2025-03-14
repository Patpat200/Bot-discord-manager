const Discord = require('discord.js')

module.exports = { 

    name : "ban",
    description: "Bannir quelqu'un",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Modération",
    options : [
        {
            type: "user",
            name: "membre",
            description: "le membre a bannir",
            required: true,
            autocomplete: false

        }, {
            type: "string",
            name: "raison",
            description: "la raison du bannissement",
            required: false,
            autocomplete: false

        }

    ],

    async run(bot, message, args){

        try {
            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            if(!user) return message.reply("L'utilisateur n'existe pas")
            let member = message.guild.members.cache.get(user.id)

            let reason = args.getString("raison");
            if(!reason) reason = "Aucune raison fournie";

            if(message.user.id === member.id) return message.reply("Vous ne pouvez pas vous bannir")
            if((await message.guild.fetchOwner()).id === user.id) return message.reply("Vous ne pouvez pas bannir le propriétaire du serveur")
            if(member && !member.bannable) return message.reply("Je peux pas bannir ce membre")
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Vous ne pouvez pas bannir ce membre")
            if((await message.guild.bans.fetch()).get(user.id)) return message.reply("Ce membre est déjà banni");

              try {await user.send("Vous êtes banni par " + message.author.tag + " " + reason)} catch (err) {}

              await message.reply(`${message.user} a banni ${user.tag} pour la raison de : \`${reason}\``)

              await message.guild.bans.create(user.id, {reason: reason})

        } catch (error) {
            console.log(error)
            return message.reply("L'utilisateur n'existe pas")

        }
    }
}