module.exports = (client) => {
	client.log = async (logType, logMessage, logAuthor = "SYSTEM") => {

		const newLog = {
			time: new Date().toLocaleString("cs-CZ", { timeZone: "Europe/Prague" }).replace(",", " -"),
			type: logType,
			message: logMessage,
			author: logAuthor,
		}

		client.logMessages.push(newLog);
		if (client.logMessages.length > 10) {
			client.logMessages.shift();
		}

		console.log(`${newLog.time} [${newLog.type}] - ${newLog.author} - ${newLog.message}`)
	}
}