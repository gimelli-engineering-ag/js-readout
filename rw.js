const fetch = require('node-fetch');

// disable TLS checking because this would fail for accessing via ip address
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const robots = [
    {
        'ip': '', // enter ip address here
        'auth': '' // enter auth cookies here
    },
    // additional robots can be added here
]

async function get(robot) {
    try {

        let res = await fetch(`https://${robot.ip}/desk/api/robot/configuration`, {
            "credentials": "include",
            "headers": {
                "authorization": robot.auth
            },
            "method": "GET",
            "mode": "cors"
        });

        let js = await res.json();
        return js.cartesianPose.slice(12,15); // adjust the indices here if you want to store more than just the xyz position

    } catch(err) {
        return JSON.stringify(err, Object.getOwnPropertyNames(err));
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loop() {
    while (true) {
        const entry = await get(robots[process.env.ROBOT]).then(results => {
            return {
                t: Date.now(),
                r: results
            };
        });
        console.log(JSON.stringify(entry));

        await sleep(100);
    }
}

loop().catch(console.err);
