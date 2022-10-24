const { Client, GatewayIntentBits } = require("discord.js");
const { CronJob } = require("cron");
const config = require("./config.json");

let lastIndex = -1;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const job = new CronJob(config.cron, async () => {
	const channel = await client.channels.fetch(config.channel);
	let randomIndex;
	do {
		randomIndex = Math.floor(Math.random() * config.messages.length);
	} while(randomIndex === lastIndex);
	lastIndex = randomIndex;
	await channel.send(config.messages[randomIndex]);
}, null, false, Intl.DateTimeFormat().resolvedOptions().timeZone);


client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
	job.start();
});



client.login(config.token);