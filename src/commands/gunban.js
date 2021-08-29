const discord = require("discord.js");
const mongodb = require("mongodb");

const config = require("../../config.js");

/**
 * @type {mongodb.MongoClient}
 */
 var mongo = new mongodb.MongoClient(config.db, { useUnifiedTopology: true });
 mongo.connect().then(() => {
     console.log("Connected to ban database");
 });

module.exports = {
    name: 'gunban',
    description: 'Globally ban a user from servers',
    execute(message, args) {
        if (message.member.roles.cache.has(config.gunban_perms) || message.author.id == config.owners) {
            const client = message.client
            const collection = mongo.db("sbl").collection("bans")

            if (message.mentions.users.first()) {
                client.guilds.cache.forEach((guild) => {
                    guild.members.unban(message.mentions.users.first().id).catch(() => {});
                });

                collection.deleteOne({ id: message.mentions.users.first().id }).then(() => {
                    let embed = new discord.MessageEmbed()
                        .setTitle("Completed")
                        .setColor(config.embed_color);
                    message.channel.send(embed);
                }).catch((err) => {
                    let embed = new discord.MessageEmbed()
                        .setTitle("Error")
                        .setDescription("Unexpected error")
                        .setColor(config.embed_color);
                    message.channel.send(embed);
                });
            } else if (message.mentions.members.first()) {
                client.guilds.cache.forEach((guild) => {
                    guild.members.unban(message.mentions.members.first().user.id).catch(() => {});
                });

                collection.deleteOne({ id: message.mentions.members.first().user.id }).then(() => {
                    let embed = new discord.MessageEmbed()
                        .setTitle("Completed")
                        .setColor(config.embed_color);
                    message.channel.send(embed);
                }).catch((err) => {
                    let embed = new discord.MessageEmbed()
                        .setTitle("Error")
                        .setDescription("Unexpected error")
                        .setColor(config.embed_color);
                    message.channel.send(embed);
                });
            } else if (args.length > 0 && client.users.cache.has(args[0])) {
                client.guilds.cache.forEach((guild) => {
                    guild.members.unban(args[0]).catch(() => {});
                });

                collection.deleteOne({ id: args[0] }).then(() => {
                    let embed = new discord.MessageEmbed()
                        .setTitle("Completed")
                        .setColor(config.embed_color);
                    message.channel.send(embed);
                }).catch((err) => {
                    let embed = new discord.MessageEmbed()
                        .setTitle("Error")
                        .setDescription("Unexpected error")
                        .setColor(config.embed_color);
                    message.channel.send(embed);
                });
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