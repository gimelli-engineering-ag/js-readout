const fetch = require('node-fetch');

// disable TLS checking
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const robots = [
    {
        'ip': '192.168.1.180',
        'auth': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJuYW1lIjoiZnJhIiwicm9sZSI6eyJhdXRob3JpemF0aW9uIjpbeyJwZXJtaXNzaW9uIjoiUmVhZFdyaXRlIiwicmVzb3VyY2UiOiJUYXNrcyJ9LHsicGVybWlzc2lvbiI6IlJlYWRXcml0ZSIsInJlc291cmNlIjoiU2tpbGxzIn0seyJwZXJtaXNzaW9uIjoiUmVhZFdyaXRlIiwicmVzb3VyY2UiOiJQYXJhbWV0ZXJzIn0seyJwZXJtaXNzaW9uIjoiUmVhZFdyaXRlIiwicmVzb3VyY2UiOiJFeGVjdXRpb24ifSx7InBlcm1pc3Npb24iOiJSZWFkV3JpdGUiLCJyZXNvdXJjZSI6IlN0YXR1cyJ9LHsicGVybWlzc2lvbiI6IlJlYWRXcml0ZSIsInJlc291cmNlIjoiQnVuZGxlcyJ9LHsicGVybWlzc2lvbiI6IlJlYWRXcml0ZSIsInJlc291cmNlIjoiU2NyaXB0cyJ9LHsicGVybWlzc2lvbiI6IlJlYWRXcml0ZSIsInJlc291cmNlIjoiQWRtaW4ifSx7InBlcm1pc3Npb24iOiJSZWFkV3JpdGUiLCJyZXNvdXJjZSI6IlNhZmV0eSJ9XSwibmFtZSI6ImFkbWluIn19.tVGo_2piO-FgWa4PDsRqma4SFdxFfHmsPPd3EJkHuR12-OFPxLAJHiXQ2RVFrZ6H0g7a7IrIbmzndRrLUm20-A'
    },
    {
        'ip': '192.168.1.181',
        'auth': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJuYW1lIjoiZnJhIiwicm9sZSI6eyJhdXRob3JpemF0aW9uIjpbeyJwZXJtaXNzaW9uIjoiUmVhZFdyaXRlIiwicmVzb3VyY2UiOiJUYXNrcyJ9LHsicGVybWlzc2lvbiI6IlJlYWRXcml0ZSIsInJlc291cmNlIjoiU2tpbGxzIn0seyJwZXJtaXNzaW9uIjoiUmVhZFdyaXRlIiwicmVzb3VyY2UiOiJQYXJhbWV0ZXJzIn0seyJwZXJtaXNzaW9uIjoiUmVhZFdyaXRlIiwicmVzb3VyY2UiOiJFeGVjdXRpb24ifSx7InBlcm1pc3Npb24iOiJSZWFkV3JpdGUiLCJyZXNvdXJjZSI6IlN0YXR1cyJ9LHsicGVybWlzc2lvbiI6IlJlYWRXcml0ZSIsInJlc291cmNlIjoiQnVuZGxlcyJ9LHsicGVybWlzc2lvbiI6IlJlYWRXcml0ZSIsInJlc291cmNlIjoiU2NyaXB0cyJ9LHsicGVybWlzc2lvbiI6IlJlYWRXcml0ZSIsInJlc291cmNlIjoiQWRtaW4ifSx7InBlcm1pc3Npb24iOiJSZWFkV3JpdGUiLCJyZXNvdXJjZSI6IlNhZmV0eSJ9XSwibmFtZSI6ImFkbWluIn19.ZL-oXAkRfpKWIzM0L_q9OvKA6H1jioC07nCShEE5p8w-dCEIb2eDaHaq-gj0VEQGytEK2lkMf-fMlBoNG8nX_g'
    },
    {
        'ip': '192.168.1.182',
        'auth': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJuYW1lIjoiZ2VhIiwicm9sZSI6eyJhdXRob3JpemF0aW9uIjpbeyJwZXJtaXNzaW9uIjoiUmVhZFdyaXRlIiwicmVzb3VyY2UiOiJUYXNrcyJ9LHsicGVybWlzc2lvbiI6IlJlYWRXcml0ZSIsInJlc291cmNlIjoiU2tpbGxzIn0seyJwZXJtaXNzaW9uIjoiUmVhZFdyaXRlIiwicmVzb3VyY2UiOiJQYXJhbWV0ZXJzIn0seyJwZXJtaXNzaW9uIjoiUmVhZFdyaXRlIiwicmVzb3VyY2UiOiJFeGVjdXRpb24ifSx7InBlcm1pc3Npb24iOiJSZWFkV3JpdGUiLCJyZXNvdXJjZSI6IlN0YXR1cyJ9LHsicGVybWlzc2lvbiI6IlJlYWRXcml0ZSIsInJlc291cmNlIjoiQnVuZGxlcyJ9LHsicGVybWlzc2lvbiI6IlJlYWRXcml0ZSIsInJlc291cmNlIjoiU2NyaXB0cyJ9LHsicGVybWlzc2lvbiI6IlJlYWRXcml0ZSIsInJlc291cmNlIjoiQWRtaW4ifSx7InBlcm1pc3Npb24iOiJSZWFkV3JpdGUiLCJyZXNvdXJjZSI6IlNhZmV0eSJ9XSwibmFtZSI6ImFkbWluIn19.M4_XJHXSiWmPFtRfgMmN06tInh0gl9lEQ3mS5pGlgDM3Ylgl_kUjqOvpa__508-3Fxw6tw9V8vsDZQ9ZqumK8Q'
    },
    {
        'ip': '192.168.1.185',
        'auth': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJuYW1lIjoiZnJhIiwicm9sZSI6eyJhdXRob3JpemF0aW9uIjpbeyJwZXJtaXNzaW9uIjoiUmVhZFdyaXRlIiwicmVzb3VyY2UiOiJUYXNrcyJ9LHsicGVybWlzc2lvbiI6IlJlYWRXcml0ZSIsInJlc291cmNlIjoiU2tpbGxzIn0seyJwZXJtaXNzaW9uIjoiUmVhZFdyaXRlIiwicmVzb3VyY2UiOiJQYXJhbWV0ZXJzIn0seyJwZXJtaXNzaW9uIjoiUmVhZFdyaXRlIiwicmVzb3VyY2UiOiJFeGVjdXRpb24ifSx7InBlcm1pc3Npb24iOiJSZWFkV3JpdGUiLCJyZXNvdXJjZSI6IlN0YXR1cyJ9LHsicGVybWlzc2lvbiI6IlJlYWRXcml0ZSIsInJlc291cmNlIjoiQnVuZGxlcyJ9LHsicGVybWlzc2lvbiI6IlJlYWRXcml0ZSIsInJlc291cmNlIjoiU2NyaXB0cyJ9LHsicGVybWlzc2lvbiI6IlJlYWRXcml0ZSIsInJlc291cmNlIjoiQWRtaW4ifSx7InBlcm1pc3Npb24iOiJSZWFkV3JpdGUiLCJyZXNvdXJjZSI6IlNhZmV0eSJ9XSwibmFtZSI6ImFkbWluIn19.Cnu0GYSC53PAXJpb1zkeJvNpe43fx6_Gscl-rT-qK_BD7fo_TD4p9IISK9w4Rpapft-jr7G94HpmgtPD1rA51w'
    },
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
        return js.cartesianPose.slice(12,15);

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

        await sleep(50);
    }
}

loop().catch(console.err);
