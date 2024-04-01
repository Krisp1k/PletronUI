module.exports = {
	name: 'ready',
	once: true,
	presenceDelay: 30, // seconds
	fetchClansDelay: 90, // minutes
	async execute(client) {
		await client.log("BOT", `Logged in as ${client.user.tag}`);

		for (const job of Object.values(client.cronJobs)) {
			await job.start();

			if (!job.running) {
				await client.log("CRON", `Job ${job.name} failed to start`);
			}
		}
	}
}