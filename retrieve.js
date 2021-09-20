const fs = require("fs");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://conversationstartersworld.com/topics-to-talk-about/");
xhr.send();

xhr.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        var res = this.responseText;

        var splitted = res.split("<h3>");
        var topics = [];
        for(let i = 1; i < splitted.length; i++) {
            var temporary = "";
            var inc = 3;
            var run = true;
            function loop() {
            
                if(splitted[i].substring(inc,inc+1) == "<") {
                    
                    run = false;
                    topics.push(temporary);
                }
                if(run == true) {
                    if(temporary.length > 0) {
                        temporary = temporary + splitted[i].substring(inc,inc+1);
                        
                    } else {
                        temporary = splitted[i].substring(inc,inc+1);
                    }
                    inc++
                    loop()
                }


                
            }
            loop();

        }

        console.log(topics);
        fs.writeFile("file.json", JSON.stringify(topics, null, 4), (err) => {
            if(err) throw err;
        });
    }
}