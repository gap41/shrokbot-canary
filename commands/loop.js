const {prefix, token} = require('../config.json');
const fs = require("fs-extra");
module.exports = {
    name: "loop",
    description: "Loops the playing song",
    async execute(message, args) {
        //read the config
        try {
            var config = JSON.parse(await fs.readFile("./currentConfig.json"), "utf8");
        } catch (error) {
            return message.channel.send("Fuck. That went horribly wrong.");
        }

        config.loopSong = true;
        
        fs.writeFile("./currentConfig.json", JSON.stringify(config, null, 4))
        .then(()=>{
            message.channel.send("Looping the current song!");
        })
        .catch((err)=>{
            message.channel.send(err);
        })

    }
}