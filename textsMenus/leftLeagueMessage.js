const leftLeagueMessage = ((notOwnLeague) => {

    leagueNames = notOwnLeague.map((elem) => {
        return String(`- ${elem}`)
    }).join("\n")

    return `You currently participate in the following league${notOwnLeague.length > 1 ? 's' : ''}: \n\n${leagueNames}\n\n\Enter the exact name of the league you want to leave.\n\n`
})

module.exports = leftLeagueMessage