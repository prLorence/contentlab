import * as https from "https";

const catFactOptions = {
    host: "catfact.ninja",
    path: "/fact",
    method: 'GET',
};

export async function getCatFact(): Promise<string> {
    return new Promise((resolve, reject) => {
        https.get(catFactOptions, (res) => {
            if (res.statusCode !== 200) {
                reject(`Error: Failed to fetch data, status code: ${res.statusCode}`);
                return;
            }

            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    resolve(parsedData.fact);
                } catch (error) {
                    reject('Error parsing data');
                }
            });
        }).on('error', (err) => {
            reject(`Request error: ${err.message}`);
        });
    });
}
