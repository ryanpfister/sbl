const discord = require("discord.js");
const config = require("../../config.js");

module.exports = {
    name: 'help',
    description: 'Shows a help dialog',
    execute(message, args) {
        let embed = new discord.MessageEmbed()
            .setTitle("Captcha Bot")
            .setColor(config.embed_color)
            .addField(`${prefix}help`, "Shows a help dialog")
            .addField(`${prefix}info`, "Shows a info dialog")
        message.channel.send(embed)
    },
};