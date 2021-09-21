const {prefix, token} = require('../config.json');
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
const fs = require("fs-extra");


module.exports = {
    name: "play",
    description: "Plays music from YouTube",
    async execute(message, args) {

        var vc = message.member.voice.channel;

        var ch = message.channel.id;
        if(ch != 405738093421789194 && ch != 737346979922968598) return message.channel.send("Fuck off");

        if(!vc) return message.channel.send("You need to be in a voice channel to listen to music!")
        var perms = vc.permissionsFor(message.client.user);
        if(!perms.has("CONNECT")) return message.channel.send("I don't have the sufficient permissions.");
        if(!perms.has("SPEAK")) return message.channel.send("I don't have the sufficient permissions.");

        if(!args.length) {
            return message.channel.send("Specify a link as well!");
        }

        var connection = await vc.join();

        var videoFinder = async(query)=>{
            var videoResult = await ytSearch(query);

            return (videoResult.videos.length > 1)?videoResult.videos[0]:null;
        }

        var video = await videoFinder(args.join(' '));
        if(video) {
            
            function playAudio() {
                var stream = ytdl(video.url, {filter:'audioonly'});
                connection.play(stream, {seek: 0, volume: 1})
                .on("finish", async ()=>{
                    //Check if the song should be looped
                    try {
                        var config = JSON.parse(await fs.readFile("./currentConfig.json", "utf8"));
                    } catch (error) {
                        message.channel.send("Fuck.");
                    }
    
                    if(config.loopSong) {
                        playAudio();
                    } else {
                        //Leave the voicechannel when the video has been played
                        setTimeout(()=>{
                            vc.leave();
                        }, 10000);
                    }
                })
            }

            playAudio();


            await message.channel.send(`:clap: Now playing ***` + video.title + `***`);
        } else {
            message.channel.send("No videos were found.");
        }

    }
}

function playSongStream() {
    
}