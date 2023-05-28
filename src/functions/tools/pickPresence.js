const { ActivityType } = require('discord.js')

module.exports = (client) => {
    client.pickPresence = async () => {

        const options = [
            {
                type: ActivityType.Playing,
                text: "www.PánHradu.cz",
                status: "online"
            },
            {
                type: ActivityType.Listening,
                text: "aktivity na serverech",
                status: "idle"
            },
            {
                type: ActivityType.Playing,
                text: "s tvoji mamkou",
                status: "dnd"
            }
        ];

        const option = Math.floor(Math.random() * options.length);

        client.user
        .setPresence({
            activities: [
                {
                    name: options[option].text,
                    type: options[option].type
                }
            ],
            status: options[option].status
        })
    }
}