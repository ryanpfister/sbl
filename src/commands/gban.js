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
    name: 'gban',
    description: 'Globally ban a user from servers',
    execute(message, args) {
        if (message.member.roles.cache.has(config.gban_perms) || message.author.id == config.owners) {
            const client = message.client
            const collection = mongo.db("sbl").collection("bans")

            if (message.mentions.users.first()) {
                let reason = args.length > 1 ? args.slice(1).join(" ") : "N/A";

                collection.insertOne({ id: message.mentions.users.first().id, reason: reason }).then(() => {
                    client.guilds.cache.forEach((guild) => {
                        guild.members.ban(message.mentions.users.first().id, { reason: `Banned via SBL. Reason: ${reason}` }).then(() => { }).catch(() => { });
                    });

                    let embed = new discord.MessageEmbed()
                        .setTitle("Completed")
                        .setColor(config.embed_color);
                    message.channel.send(embed);
                }).catch((err) => {
                    let embed = new discord.MessageEmbed()
                        .setTitle("Error")
                        .setDescription("Unexpected error")
                        .setColor(config.embed_color)
                    message.channel.send(embed);
                });
            } else if (message.mentions.members.first()) {
                let reason = args.length > 1 ? args.slice(1).join(" ") : "N/A";

                collection.insertOne({ id: message.mentions.members.first().user.id, reason: reason }).then(() => {
                    client.guilds.cache.forEach((guild) => {
                        guild.members.ban(message.mentions.members.first().user.id, { reason: `Banned via SBL. Reason: ${reason}` }).then(() => { }).catch(() => { });
                    });

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
                let reason = args.length > 1 ? args.slice(1).join(" ") : "N/A";

                collection.insertOne({ id: args[0], reason: reason }).then(() => {
                    client.guilds.cache.forEach((guild) => {
                        guild.members.ban(args[0], { reason: `Banned via SBL. Reason: ${reason}` }).then(() => { }).catch(() => { });
                    });

                    let embed = new discord.MessageEmbed()
                        .setTitle("Completed")
                        .setColor(config.embed_color);
                    message.channel.send(embed);
                }).catch((err) => {
                    let embed = new discord.MessageEmbed()
                        .setTitle("Error")
                        .setDescription("Unexpected error")
                        .setColor(config.embed_color)
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