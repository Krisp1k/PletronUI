module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {

        // aktivita na DC
        client.pickPresence()
        setInterval(client.pickPresence, 15 * 1000)

        // fetch klanů
        client.fetchClans()
        setInterval(client.fetchClans, 60 * 1000)


        console.log('jedu jak drak a jsem ' + client.user.tag)
    }

}