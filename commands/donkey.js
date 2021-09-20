module.exports = {
    name: "as",
    description: "DONKEEEY",
    execute(message, args) {
        async function test() {

            if(message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();
                const dispatcher = connection.play("/sounds/hellothere.mp3");
                
                dispatcher.on("finish", () => {
                    message.guildme.voiceChannel.disconnect();
                })
                
                dispatcher.destroy();
            } else {
                message.reply("I can't **DONKEY** you if you aren't in a voice channel");
            }
            
            
        }
        test();
    }
}