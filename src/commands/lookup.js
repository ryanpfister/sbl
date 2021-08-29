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
    name: 'lookup',
    description: 'Lookup a user inside the database',
    execute(message, args) {
        const client = message.client
        const collection = mongo.db("myblacklist").collection("bans");

        if (message.mentions.users.first()) {
            if (client.users.cache.has(message.mentions.users.first().id)) {
                let embed = new discord.MessageEmbed()
                    .setTitle("Please wait")
                    .setColor(config.embed_color);
                message.channel.send(embed).then((m) => {
                    let servers = [];
                    client.guilds.cache.forEach((guild) => {
                        if (guild.members.cache.has(message.mentions.users.first().id)) {
                            servers.push(guild.name);
                        }
                    });
                    collection.findOne({ id: message.mentions.users.first().id }).then((doc) => {
                        if (doc) {
                            let embed = new discord.MessageEmbed()
                                .setTitle(`User Information`)
                                .setDescription(`About <@${message.mentions.users.first().id}>`)
                                .setColor(config.embed_color)
                                .addField("Servers", servers.join("\n") || "N/A")
                                .addField("Banned", "Yes")
                                .addField("Ban Reason", `\`\`\`\n${doc.reason}\n\`\`\``);
                            m.edit(embed);
                        } else {
                            let embed = new discord.MessageEmbed()
                                .setTitle(`User Information`)
                                .setDescription(`About <@${message.mentions.users.first().id}>`)
                                .setColor(config.embed_color)
                                .addField("Servers", servers.join("\n") || "N/A")
                                .addField("Banned", "No")
                                .addField("Ban Reason", `\`\`\`\nN/A\n\`\`\``);
                            m.edit(embed);
                        }
                    }).catch((err) => {
                        let embed = new discord.MessageEmbed()
                            .setTitle("Error")
                            .setDescription("Unexpected error")
                            .setColor(config.embed_color);
                        m.edit(embed);
                    });
                });
            } 
        } else if (message.mentions.members.first()) {
            if (client.users.cache.has(message.mentions.members.first().user.id)) {
                let embed = new discord.MessageEmbed()
                    .setTitle("Please wait")
                    .setColor(config.embed_color);
                message.channel.send(embed).then((m) => {
                    let servers = [];
                    client.guilds.cache.forEach((guild) => {
                        if (guild.members.cache.has(message.mentions.members.first().user.id)) {
                            servers.push(guild.name);
                        }
                    });
                    collection.findOne({ id: message.mentions.members.first().user.id }).then((doc) => {
                        if (doc) {
                            let embed = new discord.MessageEmbed()
                                .setTitle(`User Information`)
                                .setDescription(`About <@${message.mentions.members.first().user.id}>`)
                                .setColor(config.embed_color)
                                .addField("Servers", servers.join("\n") || "N/A")
                                .addField("Banned", "Yes")
                                .addField("Ban Reason", `\`\`\`\n${doc.reason}\n\`\`\``);
                            m.edit(embed);
                        } else {
                            let embed = new discord.MessageEmbed()
                                .setTitle(`User Information`)
                                .setDescription(`About <@${message.mentions.members.first().user.id}>`)
                                .setColor(config.embed_color)
                                .addField("Servers", servers.join("\n") || "N/A")
                                .addField("Banned", "No")
                                .addField("Ban Reason", `\`\`\`\nN/A\n\`\`\``);
                            m.edit(embed);
                        }
                    }).catch((err) => {
                        let embed = new discord.MessageEmbed()
                            .setTitle("Error")
                            .setDescription("Unexpected error")
                            .setColor(config.embed_color);
                        m.edit(embed);
                    });
                });
            } 
        } else if (args.length > 0) {
            id = args[0];
            if (client.users.cache.has(args[0])) {
                let embed = new discord.MessageEmbed()
                    .setTitle("Please wait")
                    .setColor(config.embed_color);
                message.channel.send(embed).then((m) => {
                    let servers = [];
                    client.guilds.cache.forEach((guild) => {
                        if (guild.members.cache.has(args[0])) {
                            servers.push(guild.name);
                        }
                    });
                    collection.findOne({ id: args[0] }).then((doc) => {
                        if (doc) {
                            let embed = new discord.MessageEmbed()
                                .setTitle(`User Information`)
                                .setDescription(`About <@${args[0]}>`)
                                .setColor(config.embed_color)
                                .addField("Servers", servers.join("\n") || "N/A")
                                .addField("Banned", "Yes")
                                .addField("Ban Reason", `\`\`\`\n${doc.reason}\n\`\`\``);
                            m.edit(embed);
                        } else {
                            let embed = new discord.MessageEmbed()
                                .setTitle(`User Information`)
                                .setDescription(`About <@${args[0]}>`)
                                .setColor(config.embed_color)
                                .addField("Servers", servers.join("\n") || "N/A")
                                .addField("Banned", "No")
                                .addField("Ban Reason", `\`\`\`\nN/A\n\`\`\``);
                            m.edit(embed);
                        }
                    }).catch((err) => {
                        let embed = new discord.MessageEmbed()
                            .setTitle("Error")
                            .setDescription("Unexpected error")
                            .setColor(config.embed_color);
                        m.edit(embed);
                    });
                });
            } 
        }
    },
};