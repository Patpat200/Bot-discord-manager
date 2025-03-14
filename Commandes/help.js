const Discord = require('discord.js')

module.exports = {

    name : "help",
    description : "Donne les commandes disponibles",
    permission : "Aucune",
    dm : true,
    category: "Information",
    options: [
        {
            type: "string",
            name: "commande",
            description: "La commande a afficher",
            required: false,
            autocomplete: true
        }
    ],



    async run(bot, message, args) {

        let command;
        if (args.getString("commande")) {

            command = bot.commands.get(args.getString("commande"));
            if (!command) return message.reply("La commande n'existe pas")

        }


        if(!command) {

            let categories = [];
            bot.commands.forEach(command => {
                if(!categories.includes(command.category)) categories.push(command.category)
            })

            let Embed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Commande du bot`)
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Commandes disponibles : \`${bot.commands.size}\`\nCategories disponibles : \`${categories.length}\``)
            .setTimestamp()
            .setFooter({text: "Commande du robot"})

            await categories.sort().forEach(async cat =>{

                let commands = bot.commands.filter(cmd => cmd.category === cat)
                Embed.addFields({name: `${cat}`, value: `${commands.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join("\n")}`})
            })

            await message.reply({embeds: [Embed]})


        } else {


            let Embed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Commande ${command.name}`)
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Nom : \`${command.name}\`\nDescription : \`${command.description}\`\nCategory : \`${command.category}\`\nPermission requise : \`${typeof command.permission !== "bigint" ? command.permission : new Discord.PermissionsBitField(command.permission).toArray(false)}\`\nCommande en DM : \`${command.dm? "Oui" : "Non"}\``)
            .setTimestamp()
            .setFooter({text: "Commande du robot"})

            await message.reply({embeds: [Embed]})



        }
    }
}