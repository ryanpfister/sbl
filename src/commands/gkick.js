const discord = require("discord.js");

const config = require("../../config.js");

module.exports = {
    name: 'gkick',
    description: 'Globally ban a user from servers',
    execute(message, args) {
        if (message.member.roles.cache.has(config.gkick_perms) || message.author.id == config.owners) {
            const client = message.client
            if (message.mentions.users.first()) {
                client.guilds.cache.forEach((guild) => {
                    if (guild.members.cache.has(message.mentions.users.first().id)) {
                        let kickUser = guild.members.cache.get(message.mentions.users.first().id);
                        kickUser.kick("Kicked by SBL").then(() => {}).catch(() => {});
                    }
                });
        
                let embed = new discord.MessageEmbed()
                    .setTitle("Completed")
                    .setColor(config.embed_color);
                message.channel.send(embed);
            } else if (message.mentions.members.first()) {
                client.guilds.cache.forEach((guild) => {
                    if (guild.members.cache.has(message.mentions.members.first().user.id)) {
                        let kickUser = guild.members.cache.get(message.mentions.members.first().user.id);
                        kickUser.kick("Kicked by SBL").then(() => {}).catch(() => {});
                    }
                });
        
                let embed = new discord.MessageEmbed()
                    .setTitle("Completed")
                    .setColor(config.embed_color);
                message.channel.send(embed);
            } else if (args.length > 0 && client.users.cache.has(args[0])) {
                client.guilds.cache.forEach((guild) => {
                    if (guild.members.cache.has(args[0])) {
                        let kickUser = guild.members.cache.get(args[0]);
                        kickUser.kick("Kicked by SBL").then(() => {}).catch(() => {});
                    }
                });
        
                let embed = new discord.MessageEmbed()
                    .setTitle("Completed")
                    .setColor(config.embed_color);
                message.channel.send(embed);
            } else {
                let embed = new discord.MessageEmbed()
                    .setTitle("Error")
                    .setDescription("Please specify a user")
                    .setColor(config.embed_color);
                message.channel.send(embed);
            }
        } else {
            let embed = new discord.MessageEmbed()
                .setTitle("Permissions Error")
                .setColor(config.embed_color)
                .setDescription("You don't have permission to use this command.")
            message.channel.send(embed);
        }
    },
};