const {prefix, token} = require('../config.json');

module.exports = {
    name: "help",
    description: "Gives you help",
    execute(message, args) {

        message.channel.send("```**Complete list of commands** \n "
                             + prefix + "topic - gives you a random topic \n "
                             + prefix + "addtopic - adds a topic to the topic list \n "
                             + prefix + "banword - bans a word (or a word / sentence similar to it) from being added to the topic list \n "
                             + prefix + "donkey - DONKEEEEY \n "
                             + prefix + "siwallah - wallaaaah \n "
                             + prefix + "rick - Never gonna give you up```");

    }
}
