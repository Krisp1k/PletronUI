module.exports = {
    name: 'ready',
    once: true,
    presenceDelay: 30, // seconds
    fetchClansDelay: 90, // minutes
    async execute(client) {

        // aktivita na DC
        client.pickPresence()
        setInterval(client.pickPresence, this.presenceDelay * 1000)

        // fetch klanů
        client.fetchClans()
        setInterval(client.fetchClans, this.fetchClansDelay * 1000 * this.fetchClansDelay)

        console.log('jedu jak drak a jsem ' + client.user.tag)
    }
}