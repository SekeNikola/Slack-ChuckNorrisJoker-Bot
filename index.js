const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token: 'YOUR-TOKEN',
    name: 'BOT-NAME'
})

bot.on('start', () => {
    bot.postMessageToChannel('general', 'Wanna hear Chuck Norris Joke?');
});

bot.on('error', (err) => console.log(err));

// Message Handler
bot.on('message', data => {
    if (data.type != 'message') {
        return
    }
    handleMessage(data.text);
});

function handleMessage(message) {
    if (message.includes(' yes') || message.includes(' joke') || message.includes(' another')) {
        chuckJoke();
    } else if (message.includes(' suck') || message.includes(' stupid')) {
        chuckMad()
    }
}

// Get Jokes from API
function chuckJoke() {
    axios.get('https://api.icndb.com/jokes/random')
        .then(res => {
            const joke = res.data.value.joke;
            bot.postMessageToChannel('general', `${joke}`);
        });
}

// If Chuck is insulted
function chuckMad() {
    var url = 'https://hooks.slack.com/services/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'
    var image = {
        "attachments": [{
            "image_url": "https://thumbs.gfycat.com/GrandioseHarmoniousCoypu-size_restricted.gif",
            "fields": [{}, ],
        }, ]
    }

    axios.post(url, JSON.stringify(image), function (data) {
        bot.postMessageToChannel('general', data)
    })
}