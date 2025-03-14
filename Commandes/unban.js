const Discord = require('discord.js')

module.exports = { 

    name : "unban",
    description: "Débannir quelqu'un",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Modération",

    options : [
        {
            type: "user",
            name: "utilisateur",
            description: "L'utilisateur a débannir",
            required: true,
            autocomplete: false,
            autocomplete: false

        }, {
            type: "string",
            name: "raison",
            description: "la raison du débannissement",
            required: false,
            autocomplete: false

        }

    ],

    async run(bot, message, args){

        try {


            let user = args.getUser("utilisateur");
            if(!user) return message.reply("L'utilisateur n'existe pas")

            let reason = args.getString("raison")
            if(!reason) reason = "Aucune raison fournie"

            if(!(await message.guild.bans.fetch()).get(user.id)) return message.reply("L'utilisateur n'est pas banni !")

            try {await user.send(`Tu as été unban par ${message.user.tag} pour la raison de : \`${reason}\``)} catch (err) {}

            await message.reply(`${message.user} a unban ${user.tag} pour la raison de: \`${reason}\``)

            await message.guild.members.unban(user, reason)

        } catch(err) {
            return message.reply("L'utilisateur n'existe pas")
        }

    }
}