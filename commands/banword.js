const fs = require("fs");
const fuzzyset = require("fuzzyset");
const {prefix, token} = require('../config.json');
module.exports = {
    name: "banword",
    description: "Bans a word",
    execute(message, args) {
        
        if(args.length == 0) {
            message.channel.send("Remember to include an argument! Eg.: `" + prefix + "banword ida volden`");
            return;
        }

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

        var banbanList = [
            "pernille synnøve",
            "fiskermannen",
            "william liker pernille synnøve",
            "Jakob behrens kort",
            "jakob er kort"
        ]

        var term = FuzzySet(banbanList);
        var score = term.get(arguments);

        if(score != null) {
            if(score[0][0] > 0.7) {
                message.channel.send("Sorry, `" + arguments + "` can't be added to the ban list");
                return;
            }
        }


        console.log(arguments);

        fs.readFile("./bannedWords.json", (err, data) => {
            if(err) {
                message.channel.send("Could not add `" + arguments + "` to the ban filter!");
            }

            var words = JSON.parse(data);

            var list = words.bannedWords;
            var occured = false;
            for(let i = 0; i < list.length; i++) {
                if(arguments.toLowerCase() == list[i].toLowerCase()) {
                    occured = true;
                }
            }

            if(occured == true) {
                message.channel.send("`" + arguments + "` is already added to the ban filter!");
                return;
            }

            words.bannedWords.push(arguments);

            fs.writeFile("./bannedWords.json", JSON.stringify(words, null, 4), (err) => {
                if(err) {
                    message.channel.send("Could not add `" + arguments + "` to the ban filter! (1)");
                    return;
                }
                message.channel.send("Added `" + arguments + "` to the ban filter");

            })

        })


    }
}