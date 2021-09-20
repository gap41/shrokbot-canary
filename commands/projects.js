const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = {
    name: "projects",
    description: "Adds a topic",
    execute(message, args) {
        message.channel.send("```***All features that are currently being implemented*** \n #donkey - DONKEEY (✓ Finished)```");

    }
}