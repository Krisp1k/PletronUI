const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v10')
const fs = require('fs')

require('dotenv').config()

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync("./src/commands")
        for (const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter((file) => file.endsWith('.js'))

            const { commands, commandArray } = client
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`)
                commands.set(command.data.name, command)
                commandArray.push(command.data.toJSON())
                console.log(command.data.name + " registered")
            }
        }

        const clientId = '1110915541469773866'
        client.guilds.cache.map(guild => console.log(guild.id))
        const rest = new REST({version: '9'}).setToken(process.env.token)

        try {
            console.log("Refreshing app (/) commands")
            await rest.put(Routes.applicationCommands(clientId), {
                body: client.commandArray,
            })
            console.log("Done refreshing app (/) commands") 
        } catch (e) {
            console.error(e)
            return
        }
    }
}