const { CronJob } = require("cron")

module.exports = (client) => {
	client.cronJobs =
	{
		fetchClans: CronJob.from({
			cronTime: '@hourly',
			onTick: async () => {
				await client.fetchClans();
			},
			onComplete: async () => {
				await client.log("CRON", "FetchClans finished")
			},
			start: true,
			timeZone: 'Europe/London'
		}),

		pickPresence: CronJob.from({
			cronTime: '*/1 * * * *',
			onTick: async () => {
				await client.pickPresence();
			},
			onComplete: async () => {
				await client.log("CRON", "pickPresence finished")
			},
			start: true,
			timeZone: 'Europe/London'
		}),
	}
}