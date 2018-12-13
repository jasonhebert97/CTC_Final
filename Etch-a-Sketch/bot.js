console.log("bot is running");

var Twit = require('twit');
var fs = require('fs');

var T = new Twit({
    consumer_key: '##########',
    consumer_secret: '##########',
    access_token: '##########',
    access_token_secret: '##########'
})

function tweetIt() {

    var cmd = 'processing-java --sketch=`pwd`/final_processing --run';
    var exec = require('child_process').exec;
    exec(cmd, processing);

    function processing() {
        var filename = 'final_processing/output.png';
        var params = {
            encoding: 'base64'
        }
        var b64content = fs.readFileSync(filename, params);

        T.post('media/upload', { media_data: b64content }, uploaded);

        function uploaded(err, data, response) {
            var id = data.media_id_string;
            var tweet = {
                status: "#final",
                media_ids: [id]
            }
            T.post('statuses/update', tweet, tweeted);
        }

        function tweeted(err, data, response) {
            if (err) {
                console.log("something went wrong");
            } else {
                console.log("it works");
            }
        }
    }
}

tweetIt();
