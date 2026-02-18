# Squad Status Bot

A simple Discord bot that displays your Squad server status (players, queue, map) as its activity using the BattleMetrics API.

Example: `Watching 85(+12) / 100 - Gorodok RAAS v1`

## Discord Setup

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications) and create a new application
2. Go to **Bot** and click **Reset Token** to get your bot token
3. Disable **Public Bot** so only you can invite it
4. Go to **OAuth2 > URL Generator**, select the `bot` scope (no permissions needed), and use the generated URL to invite the bot to your server

## Configuration

Copy `.env.example` to `.env` and fill in the values:

```
TOKEN=your-discord-bot-token
BATTLEMETRICS_SERVER_ID=your-server-id
UPDATE_INTERVAL=60
```

- `TOKEN` — Your Discord bot token
- `BATTLEMETRICS_SERVER_ID` — Your server ID from BattleMetrics (the number in the URL: `https://www.battlemetrics.com/servers/squad/12345`)
- `UPDATE_INTERVAL` — Status refresh interval in seconds (default: 60)

## Run with Docker

```bash
docker compose up -d
```

## Run without Docker

Requires Node.js 22+

```bash
npm install
npm start
```
