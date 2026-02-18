const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
require('dotenv').config();

const TOKEN = process.env.TOKEN;
const SERVER_ID = process.env.BATTLEMETRICS_SERVER_ID;
const UPDATE_INTERVAL = (parseInt(process.env.UPDATE_INTERVAL) || 60) * 1000;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

async function fetchServerStatus() {
    const res = await fetch(`https://api.battlemetrics.com/servers/${SERVER_ID}`);
    if (!res.ok) throw new Error(`BattleMetrics API returned ${res.status}`);
    const json = await res.json();
    return json.data;
}

async function updateActivity() {
    try {
        const data = await fetchServerStatus();
        const players = data.attributes.players;
        const maxPlayers = data.attributes.maxPlayers;
        const map = data.attributes.details.map;
        const queue = data.attributes.details.squad_publicQueue || 0;
        const status = `${players}(+${queue}) / ${maxPlayers} - ${map}`;

        client.user.setActivity(status, { type: ActivityType.Watching });
        console.log(`Updated activity: ${status}`);
    } catch (error) {
        console.error(`Failed to update activity: ${error.message}`);
    }
}

client.once('clientReady', async () => {
    console.log(`Logged in as ${client.user.tag}`);
    await updateActivity();
    setInterval(updateActivity, UPDATE_INTERVAL);
});

client.login(TOKEN);
