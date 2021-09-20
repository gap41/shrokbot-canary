const {prefix, token} = require('../config.json');

module.exports = {
    name: "ping",
    description: "Plays music from YouTube",
    execute(message, args) {
        
        var date = new Date();
        console.log(date.valueOf())
        message.channel.send("Pong! " + (date.valueOf() - message.createdTimestamp) + "ms");

    }
}