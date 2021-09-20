const fs = require("fs");
const { userInfo } = require("os");
const {genericError, wordNotAscii, bannedWordAdded, topic} = require('../responses.json');

module.exports = {
    name: "topic",
    description: "Returns a topic",
    execute(message, args) {

        if(message.member.user.tag == "Za Warudo#7207") {
            message.channel.send("Alt for deg, Adam ***<3***")
        }

        fs.readFile("./topics.json", (err, data) => {
            if(err) {
                message.channel.send(genericError[0]);
            }

            var topics = JSON.parse(data).topics;

            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            var integer = getRandomInt(0, topics.length-1);
            
            var response = topic[getRandomInt(0,topic.length-1)];
            message.channel.send( response + " `" + topics[integer] + "`");
            
        })



    }
}