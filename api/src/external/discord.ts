import * as https from "https";

const discordOptions = {
    // TODO: move this to env variable
    host: "discord.com",
    path: "/api/webhooks/1281491377590636544/4ZgziHH6yNolUJUuJhwChXv7a7A1aPcORfT8YaiqNiGxCn69R6DPZq29xxVUeqB1eW3O",
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
    }
};

export async function sendDiscordMessge(message: string) {
    const req = https.request(discordOptions, (res) => {
        if (res.statusCode! >= 200) {
            console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
            res.resume();
            return;
        }
    });

    req.write(JSON.stringify({ content: message }))

    req.end();

    req.on('error', (err) => {
        console.error(`Encountered an error trying to make a request: ${err.message}`);
    });
}
