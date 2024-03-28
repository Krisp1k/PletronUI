const { CronJob } = require("cron")

module.exports = (client) => {
	client.cronJobs = 
	{
		fetchClans: CronJob.from({
			cronTime: '@hourly',
			onTick: async () => { 
				await client.fetchClans();
			},
			onComplete: console.log("[CRON] fetchClans finished"),
			start: true,
			timeZone: 'Europe/London'
		}),

		pickPresence: CronJob.from({
			cronTime: '*/1 * * * *',
			onTick: async () => { 
				await client.pickPresence();
			},
			onComplete: console.log("[CRON] PickPresence finished"),
			start: true,
			timeZone: 'Europe/London'
		}),
	}
}