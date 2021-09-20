const {prefix, token} = require('../config.json');

module.exports = {
    name: "fuckoff",
    description: "Plays music from YouTube",
    async execute(message, args) {
        message.channel.send("This function is under development!");
    }
}