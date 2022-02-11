const gTTS = require('gtts');
const serveStatic = require('serve-static')



const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const port = 4005;
app.use(cors());

const path = require('path')
//app.use('/public', express.static(path.join(__dirname, 'public')))

app.use('/public', serveStatic(path.join(__dirname, 'public')))


// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function text2speech(m){
    var speech = m;
    var gtts = new gTTS(speech, 'vi');

    gtts.save(`public/Voice_${m}.mp3`, function (err, result) {
        if (err) { throw new Error(err); }
        //console.log("Text to speech converted!");

        // var player = require('play-sound')(opts = {})

        // player.play('Voice.mp3', function (err) {
        //     if (err) throw err;
        //     //console.log("Audio finished");
        // });
    });
}


app.get('/text2speech/:m', (req, res) => {
    console.log(req.params.m)
    text2speech(req.params.m)
    res.json({Result: 'ok'})
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));



