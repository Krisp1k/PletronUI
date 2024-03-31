module.exports = {
	name: 'ready',
	once: true,
	presenceDelay: 30, // seconds
	fetchClansDelay: 90, // minutes
	async execute(client) {
		console.log('jedu jak drak a jsem ' + client.user.tag)

		for (const job of Object.values(client.cronJobs)) {
			await job.start();

			if (!job.running) {
				console.log("[CRON] Job failed to run");
			}
		}
	}
}