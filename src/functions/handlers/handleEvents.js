const fs = require('fs');
const path = require('path');

module.exports = (client) => {
	client.handleEvents = async () => {
		const eventFolders = fs.readdirSync(path.join(__dirname, '..', '..', 'events'));
		for (const folder of eventFolders) {
			const eventFolderPath = path.join(__dirname, '..', '..', 'events', folder);
			const eventFiles = fs
				.readdirSync(eventFolderPath)
				.filter((file) => file.endsWith('.js'));

			switch (folder) {
				case 'client':
					for (const file of eventFiles) {
						const eventFilePath = path.join(__dirname, '..', '..', 'events', folder, file);
						const event = require(eventFilePath);
						try {
							if (event.once) {
								client.once(event.name, (...args) => event.execute(...args, client));
							} else {
								client.on(event.name, (...args) => event.execute(...args, client));
							}
						} catch (err) {
							await client.log('ERROR', `Error při načítání eventu ${file}: ${err.message}`);
						}
					}
					break;
				default:
					break;
			}
		}
	};
};