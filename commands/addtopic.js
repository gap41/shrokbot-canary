const fs = require("fs");
const fuzzyset = require("fuzzyset");
const {prefix, token} = require('../config.json');
const {genericError, wordNotAscii, bannedWordAdded, topic} = require('../responses.json');
module.exports = {
    name: "addtopic",
    description: "Adds a topic",
    execute(message, args) {

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }


//Get the banlist
        fs.readFile("./bannedWords.json", (err, data) => {
            if(err) {
                message.channel.send(genericError[0]);
                return;
            }


            /*if(message.member.user.tag.split("#")[1] == "2084" || message.member.user.tag.split("#")[1] == "0892") {
                message.channel.send("Sorry, I'm not allowed to take requests from retards");
                return;
            }*/


            var banList = JSON.parse(data).bannedWords;
            

        
        if(args.length > 0) {

            var arguments = "";

                //Transform the args array to a string
                var holder = "";
                
                for(let k = 0; k < args.length; k++) {
                    if(holder.length != 0) {
                        holder = holder + " " + args[k];
                    } else {
                        holder = args[k];
                    }
                }

                arguments = holder;

                var bannedSymbols = [
                    "|",
                    "{",
                    "}",
                    "[",
                    "]",
                    "@",
                    ",",
                    ".",
                    "+",
                    "\\",
                    "=",
                    ")",
                    "(",
                    "/",
                    "&",
                    "%",
                    "¤",
                    "#",
                    '"',
                    "!",
                    "¨",
                    "'",
                    "-",
                    "_",
                    "^",
                    "~",
                    "§",
                    "`",
                    "?"

                ]

                var ascii = /^[ -~]+$/;
                if ( !ascii.test( arguments ) ) {


                   message.channel.send(wordNotAscii[getRandomInt(0,wordNotAscii.length-1)]);
                   return;
                }


                if(arguments.length > 30) {
                    message.channel.send("That topic is too long!");
                    return;
                }


                for(let o = 0; o < bannedSymbols.length; o++) {
                    if(arguments.split(bannedSymbols[o]).length > 3) {
                        message.channel.send("Sorry, this seems like an unnatural sentence / topic");
                        return;
                    }
                }


                var a = FuzzySet(banList);
                var score = a.get(arguments);

                console.log(score);
                if(score != null) {
                    for(let a = 0; a < score.length; a++) {

                        if(score[a][0] > 0.4) {
                            message.channel.send("Woah, slow down there! I'm not allowed to say that");
                            
                            console.log(message.member.user.tag + " tried to add a restricted word")
                            
                            return;
                        }
                    }
                }
                    

            fs.readFile("./topics.json", (err, data) => {
                if(err) {
                    message.channel.send("Could not save the topic!");
                };

                var topics = JSON.parse(data);
                var occured = false;
                for(let i = 0; i < topics.topics.length; i++) {
                    if(topics.topics[i].toLowerCase() == arguments.toLowerCase()) {
                        occured = true;
                    }
                }

                if(occured == false) {
                    topics.topics.push(arguments);  
                    var dat = JSON.stringify(topics, null, 4);
                    
                    
                    
                    fs.writeFile("topics.json", dat, (err) => {
                    if(err) {
                        message.channel.send("Could not add the topic!");
                    }
                    
                        message.channel.send("Added `" + arguments + "` as a topic");
                    });

                } else {
                    message.channel.send("`" + arguments + "` is already a topic!");
                }
                
            })

            











        } else {
            message.channel.send("Remember to mention a topic! Eg.: `" + prefix + "addtopic cows`");
        }
    })
    }
}